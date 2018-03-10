let businessService = require('./business-service');
let staffService = require('./staff-service');
let Business = require('../model/business-model');
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
    let business, staffobj;
    return  businessService.getBusinessById(bus_id).then((businessResult) => {
        //console.log("businessResult ", businessResult);
        business = new Business(businessResult);
        return staffService.getStaffByBusIdAndStaffId(bus_id, staff_id);
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
}

let findBookedSlots = (busId, staffId, date) => {

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
module.exports.findBookedSlots= findBookedSlots;

let findBookedSlotsES = (busId, staffId, appointmentDate, viewType) => {
    console.log("findBookedSlotsES:");
    var searchTerms = [];
    var rangeTerms = [];
    searchTerms.push({"field":"bus_id.raw", "value":busId});
    if (staffId) {
        searchTerms.push({"field":"staff_id.raw", "value":staffId}); 
    }

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

        var startDate = new Date(appointmentDate); 
        startDate.setDate(startDate.getDate() - day); // - day, it will get the day in a week, 0 indexed, 0 is sunday
        var startMonth = startDate.getMonth() + 1; // because months are zero indexed
        var startYear = startDate.getFullYear();
        var startDate = startDate.getDate();

        var endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7); // 7 = because week is 7 days
        var endMonth = endDate.getMonth() + 1; // because months are zero indexed
        var endYear = endDate.getFullYear();
        var endDate = endDate.getDate();

        rangeTerms.push({"field":"time", from:{operator:"gte", value:startYear+"-"+startMonth+"-"+startDate, format:"yyyy-MM-dd"}, 
                                    to:{operator:"lte", value:endYear+"-"+endMonth+"-"+endDate, format:"yyyy-MM-dd"}  
                            });
    }

    // searchTerm, rangeTerm, facet
    let esObj = docMapper.findBookedAppointments(searchTerms, rangeTerms);
    var appointmentPromise = new Promise(function(resolve, reject) {
        es.esSearch(esObj, (error, result) => {
            if (error) {
                let response = util.error();
                response.body = JSON.stringify(error)
                reject(response);
            } else {
                let response = util.success();
                response.body = JSON.stringify(result);
                resolve(response);
            }
        });
    });
    
    return appointmentPromise; 
}
module.exports.findBookedSlotsES= findBookedSlotsES;

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

let findBusinessBookedSlots = (businessId, timePeriod, date) => {
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

    return findBookedSlotsES(busId, staffId, appointmentDate, viewType);

}

module.exports.findBusinessBookedSlots= findBusinessBookedSlots;
