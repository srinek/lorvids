let businessService = require('./business-service');
let staffService = require('./staff-service');
let Business = require('../model/business-model');
let Staff = require('../model/staff-model');
let db = require('../common/db');
let util = require('../common/util');

module.exports.findAvailableSlots = (bus_id, staff_id) => {
    let business, staffobj;
    return  businessService.getBusinessById(bus_id).then((businessResult) => {
        //console.log("businessResult ", businessResult);
        business = new Business(businessResult);
        return staffService.getStaffByBusIdAndStaffId(bus_id, staff_id);
    }).then((staffResult) => {
        staffobj = new Staff(staffResult);
        business.addStaff(staffobj);
        return  business.getAvailableSlots(staffobj);
    }).catch((error) => {
        console.log(error);
    });
}

module.exports.saveAppointment = (appointmentData) => {
    var params = {
       TableName: 'Appointments',
       Item: appointmentData
    };
    console.log("params_appt "+  JSON.stringify(params));
    return db.saveData(params);
}