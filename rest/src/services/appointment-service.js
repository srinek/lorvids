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

let findBookedSlots = (busId, staffId, date) => {
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
module.exports.findBusinessBookedSlots= findBusinessBookedSlots;
