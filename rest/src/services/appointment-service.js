let businessService = require('./business-service');
let staffService = require('./staff-service');
let Business = require('../model/business-model');
let Staff = require('../model/staff-model');
let db = require('../common/db');
let util = require('../common/util');

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
