let businessService = require('./business-service');
let staffService = require('./staff-service');
let Business = require('../model/business-model');
let Staff = require('../model/staff-model');
let db = require('../common/db');
let util = require('../common/util');

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

// let findBookedSlots = (busId, staffId, date) => {

//     if ( typeof(staffId) == "string" ) {
//         var params = {
//             TableName: 'Appointments',
//             IndexName : 'StaffAppointmentsIndex',
//             KeyConditionExpression: "busId=:bus_id and staffId = :staff_id",
//             ExpressionAttributeValues: {
//                ":staff_id": staffId,
//                ":bus_id" : busId
//             }
//          };
//     }
//     // staff values has to be an array e.g. ["staff1", "staff2"]
//     if (typeof(staffId) == "object" ) {
//         var inObject = { ":bus_id" : busId};
//         var index = 0;
//         var staffKeys = "";

//         // inObject = { };

//         // staffId.forEach(function(value) {
//         //     index++;
//         //     var titleKey = ":staffId"+index;
//         //     staffKeys += titleKey + ",";
//         //     inObject[titleKey.toString()] = value;
//         // });

//         var params = {
//             TableName: 'Appointments',
//             IndexName : 'AppointmentsForBuinessStaff',
//             // KeyConditionExpression: " busId=:bus_id and staffId IN (" + staffKeys.substr(0, staffKeys.length-1) + ")",
//             // KeyConditionExpression: " staffId IN (" + staffKeys.substr(0, staffKeys.length-1) + ")",
//             KeyConditionExpression : "busId=:bus_id",
//             // FilterExpression: " staffId IN (" + staffKeys.substr(0, staffKeys.length-1) + ")",
//             ExpressionAttributeValues: inObject
//         };
//     }
//     console.log("Params123:", params);
//     let apptPromise = db.queryData(params).then((result) => {
//         return result;
//     }).catch( (error) => {
//         console.log("in error block ", error);
//         return error;
//     });
//     return apptPromise;
// }


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

    if (typeof(staffId) == "object" ) {
        var inObject = { ":bus_id" : busId};
        var index = 0;
        var staffKeys = "";

        // staffId.forEach(function(value) {
        //     index++;
        //     var titleKey = ":staffId"+index;
        //     staffKeys += titleKey + ",";
        //     inObject[titleKey.toString()] = value;
        // });

        // params["KeyConditionExpression"] = " busId=:bus_id and staffId IN (" + staffKeys.substr(0, staffKeys.length-1) + ")",
        params["KeyConditionExpression"] = " busId=:bus_id ";
        // params["FilterExpression"] = " staffId IN (" + staffKeys.substr(0, staffKeys.length-1) + ")",
        params["ExpressionAttributeValues"] = inObject
    }

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

module.exports.saveAppointment = (appointmentData) => {
    var params = {
       TableName: 'Appointments',
       Item: appointmentData
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


module.exports.getBusinessBookedAppointments = (busId, month, year, isyearly) => {

    return  businessService.getBusinessById(busId).then((businessResult) => {
        // console.log("businessResult ", businessResult);
        
        console.log("staff: ", businessResult.staffIds); 

        return findBookedSlots(busId, businessResult.staffIds, "");
    }).then((bookedSlots) => {
        console.log("bookedSlots",bookedSlots);
        return bookedSlots; 
    }).catch((error) => {
        console.log(error);
    });
}

module.exports.findBusinessBookedSlots= findBusinessBookedSlots;
