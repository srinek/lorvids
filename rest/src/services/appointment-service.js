let businessService = require('./business-service');
let staffService = require('./staff-service');
let Business = require('../model/business-model');
let ResponseModel = require('../model/response-model');
let Staff = require('../model/staff-model');
let db = require('../common/db');
let util = require('../common/util');
let es = require('../es/es-sync.js');
let docMapper = require('../common/db-es-doc-mapper.js');

module.exports.findSlotDetails = (slot_id) => {
    var params = {
        TableName: 'Appointments',
        Key: {
            'AppointmentId' : slot_id
        }
    };
    console.log("findSlots params "+  JSON.stringify(params));
    let slotDataPromise = db.getData(params);
    return slotDataPromise;
}

module.exports.findAvailableSlots = (bus_id, staff_id, date) => {
    let self = this;
    let business, staffobj;
    return  businessService.getBusinessById(bus_id).then((businessResult) => {
        //console.log("businessResult ", businessResult);
        business = new Business(businessResult);
        return self.findBookedSlots(bus_id, staff_id, date);
        //return staffService.getStaffByBusIdAndStaffId(bus_id, staff_id);
    })./* then((staffResult) => {
        staffobj = new Staff(staffResult);
        if(!staffobj.bus_hours || staffobj.bus_hours.length === 0){ // if doesn;t have business hrs default to business hours
            staffobj.bus_hours = business.bus_hours;
        }
        business.addStaff(staffobj);
        return self.findBookedSlots(bus_id, staff_id, date);
    }). */then((bookedSlots) => {
        staffobj = business.getStaff(staff_id);
        return  business.getAvailableSlots(staffobj, bookedSlots, date);
    }).catch((error) => {
        console.log(error);
    });
}

module.exports.findBookedSlots = (busId, staffId, date) => {

    var params = {
        TableName: 'Appointments',
        IndexName : 'AppointmentsForBuinessStaff',
        KeyConditionExpression: "busId=:bus_id and staffId = :staff_id",
        ExpressionAttributeValues: {
            ":bus_id" : busId,
            ":staff_id": staffId
        }
    };

    console.log("Params:", params);
    let apptPromise = db.queryData(params).then((result) => {
        return result;
    }).catch( (error) => {
        console.log("in error block ", error);
        return error;
    });
    return apptPromise;
}

module.exports.findBookedSlotsES = (busId, staffId, appointmentDate, viewType) => {
    console.log("findBookedSlotsES:");
    var searchTerms = [];
    var rangeTerms = [];
    searchTerms.push({"field":"bus_id", "value":busId});
    if (staffId) {
        searchTerms.push({"field":"staff_id", "value":staffId}); 
    }
    console.log("findBookedSlotsES searchTerms:", JSON.stringify(searchTerms));
    var _appointmentDate = new Date(appointmentDate);
    var month = _appointmentDate.getMonth() + 1; // because months are zero indexed
    var year = _appointmentDate.getFullYear();
    var day = _appointmentDate.getDay();
    var date = _appointmentDate.getDate();
    
    if (!viewType || viewType == "day") {
        rangeTerms.push({"field":"time", from:{operator:"gte", value:year+"-"+month+"-"+date, format:"yyyy-MM-dd"}, 
                                    to:{operator:"lt", value:year+"-"+month+"-"+date+"||+1d", format:"yyyy-MM-dd"} 
                 });  
    } else if (viewType == "year") {
        rangeTerms.push({"field":"time", from:{operator:"gte", value:year, format:"yyyy"}, 
                                    to:{operator:"lt", value:year+1, format:"yyyy"} 
                 });  
    } else if (viewType == "month") {
        rangeTerms.push({"field":"time", from:{operator:"gte", value:year+"-"+month, format:"yyyy-MM"}, 
                to:{operator:"lt", value:year+"-"+month+"||+1M", format:"yyyy-MM"} 
        });  
    } else if (viewType == "week") {

        var startDateObj = new Date(appointmentDate); 
        startDateObj.setDate(startDateObj.getDate() - day); // - day, it will get the day in a week, 0 indexed, 0 is sunday
        var startMonth = startDateObj.getMonth() + 1; // because months are zero indexed
        var startYear = startDateObj.getFullYear();
        var startDate = startDateObj.getDate();


        var endDateObj = new Date(startDateObj.getTime());
        endDateObj.setDate(endDateObj.getDate() + 6); // 6 = because week is 7 days, starts with 0
        var endMonth = endDateObj.getMonth() + 1; // because months are zero indexed
        var endYear = endDateObj.getFullYear();
        var endDate = endDateObj.getDate();

        rangeTerms.push({"field":"time", from:{operator:"gte", value:startYear+"-"+startMonth+"-"+startDate, format:"yyyy-MM-dd"}, 
                                    to:{operator:"lte", value:endYear+"-"+endMonth+"-"+endDate, format:"yyyy-MM-dd"}  
                            });
    }
    console.log("findBookedSlotsES rangeTerms:", JSON.stringify(rangeTerms));
    // searchTerm, rangeTerm, facet
    let esObj = docMapper.findBookedAppointments(searchTerms, rangeTerms);
    console.log("findBookedSlotsES search query:", JSON.stringify(esObj));

    // var appointmentPromise = new Promise(function(resolve, reject) {
    //     es.esSearch(esObj).then( (result) => {
    //         resolve(new ResponseModel(result));
    //     }).catch( (error) => {
    //         reject(error);
    //     });
    // });

    // return appointmentPromise; 


    return es.esSearch(esObj).then( (result) => {
        return (new ResponseModel(result));
    }).catch( (error) => {
        return error;
    }); 

    
}

module.exports.updateAppointment = (appointmentData) => {
    var params = {
       "TableName": 'Appointments',
       "Key": { "AppointmentId" : appointmentData.AppointmentId },
       "UpdateExpression": `set #service = :service, #userEmail = :useremail, #notes=:notes, #appointment_time=:time`,
       "ExpressionAttributeNames" : {
        '#service' : "service",
        '#userEmail' : "userEmail",
        '#notes' : "notes",
        '#appointment_time' : "time"
       },
       "ExpressionAttributeValues": {
        ':service' : appointmentData.service,
        ':useremail' : appointmentData.userEmail,
        ':notes' : appointmentData.notes,
        ':time' : appointmentData.time
      },
      "ConditionExpression": "attribute_exists(AppointmentId)",
      "ReturnValues": "ALL_NEW"
    };
    console.log("params_appt "+  JSON.stringify(params));
    return db.updateData(params);
}

// creates a new appointment
module.exports.createAppointment = (appointmentData) => {
    /* "appointmentId" : self.staff_id+"-"+slotid, */
    let timeInMillis = new Date(appointmentData.time).getTime();
    appointmentData.AppointmentId = appointmentData.staffId+"-"+timeInMillis+"-"+util.randomValueHex(8);
    var params = {
       TableName: 'Appointments',
       Item: appointmentData,
       "ReturnValues": "ALL_OLD"
    };
    console.log("params_appt "+  JSON.stringify(params));
    return db.saveData(params);
}

module.exports.findBusinessBookedSlots = (businessId, timePeriod, date) => {
    let business, staffobj;
    return  businessService.getBusinessById(bus_id).then((businessResult) => {
        business = new Business(businessResult);
        return staffService.getAllStaffInBusiness(bus_id); // get all staff's
    }).then((staffResult) => {
        staffobj = new Staff(staffResult);
        if(!staffobj.bus_hours){ // if doesn;t have business hrs default to business hours
            staffobj.bus_hours = business.bus_hours;
        }
        business.addStaff(staffobj);
        return findBookedSlots(bus_id, staff_id, date);
    }).then((bookedSlots) => {
        return  business.getAvailableSlots(staffobj, bookedSlots, date);
    }).catch((error) => {
        console.log(error);
    });

    var params = {
        TableName: 'Appointments',
        IndexName : 'StaffAppointmentsIndex',
        KeyConditionExpression: "staffId = :staff_id and busId=:bus_id",
        ExpressionAttributeValues: {
           ":staff_id": staffId,
           ":bus_id" : busId
        }
     }; 
     console.log("getStaffByStaffId params", params);
     let apptPromise = db.queryData(params).then((result) => {
        return result;
     }).catch( (error) => {
        console.log("in error block ", error);
        return error;
     });
     return apptPromise;
}


module.exports.getBusinessBookedAppointments = (busId, staffId, appointmentDate, viewType) => {

    return this.findBookedSlotsES(busId, staffId, appointmentDate, viewType);

}

module.exports.cancelAppointment = (slot_id) => {
    let currentDate = new Date();
    currentDate = currentDate.toISOString();
    var params = {
        "TableName": 'Appointments',
        "Key": { "AppointmentId" : slot_id },
        "UpdateExpression": `set #status = :status, #updateDate = :updateDate`,
        "ExpressionAttributeNames" : {
         '#status' : "status",
         '#updateDate' : "updateDate"
        },
        "ExpressionAttributeValues": {
         ':status' : 'cancelled',
         ':updateDate' : currentDate
       },
       "ConditionExpression": "attribute_exists(AppointmentId)",
       "ReturnValues": "ALL_NEW"
     };
     console.log("params_appt "+  JSON.stringify(params));
     return db.updateData(params);
}

module.exports.getAllAppointmentsByAppointmentId = (slot_id) => {
    let slotDataPromise = this.findSlotDetails(slot_id);

    return slotDataPromise.then( (slotDetails) => {
        let userEmail = slotDetails.userEmail;

        console.log("userEmail:", userEmail);
        var searchTerms = [];

        searchTerms.push({"field":"user_email", "value":userEmail});

        let esObj = docMapper.findBookedAppointments(searchTerms);
        console.log("getAllAppointmentsByAppointmentId search query:", JSON.stringify(esObj));

        return es.esSearch(esObj).then( (result) => {
            let esResponse = new ResponseModel(result);
            return esResponse.hits;
        }).catch( (error) => {
            return error;
        });

    }).catch( (error) => {
        return Promise.reject(error);
    });
}
