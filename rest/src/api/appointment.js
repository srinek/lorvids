'use strict';
let db = require('../common/db');
let util = require('../common/util');
let user = require('./user');
let appointmentService = require('../services/appointment-service');
let emailService = require('../services/ses-service');


//saves to exisitng appointment
module.exports.save = (event, context, callback) => {
    const save_user = event.queryStringParameters.saveuser;
    let reqBody = JSON.parse(event.body);
    appointmentService.updateAppointment(reqBody.appt).then( (result) => {
       afterCreateModifyAppointment(event, context, callback, save_user, reqBody.appt, reqBody.user);
    }).catch( (error) => {
        let response = util.error();
        response.body = JSON.stringify(error);
        console.log("error callback ", response);
        callback(null, response);
    });
}
//creates a new appointment
module.exports.createNew =  (event, context, callback) => {
    const save_user = event.queryStringParameters.saveuser;
    let reqBody = JSON.parse(event.body);
    appointmentService.createAppointment(reqBody.appt).then( (result) => {
        afterCreateModifyAppointment(event, context, callback, save_user, result.Item, reqBody.user);
    }).catch( (error) => {
        let response = util.error();
        response.body = JSON.stringify(error);
        console.log("error callback ", response);
        callback(null, response);
    });
}

let afterCreateModifyAppointment = (event, context, callback, save_user, appt, userObj) => {
    if(save_user){
        emailService.sendConfirmationEmail(appt, userObj);
        user.save(event, context, callback);
     }
     else{
        let response = util.success();
        response.body = JSON.stringify(result);
        console.log("success callback ", response);
        callback(null, response);
     }
}

module.exports.getAllAppointments = (event, context, callback) => {
   let bus_id = event.pathParameters.busId;
   let staff_id = event.pathParameters.staffId;
   const date = parseInt(event.queryStringParameters.d, 10);
   appointmentService.findAvailableSlots(bus_id, staff_id, date).then((result) => {
      let response = util.success();
      response.body = JSON.stringify(result);
      console.log("success callback ", response);
      callback(null, response);
   }).catch( (error) => {
      let response = util.error();
      response.body = JSON.stringify(error);
      console.log("error callback ", response);
      callback(null, response);
   });
}


module.exports.findBookedSlots = (event, context, callback) => {
    let bus_id = event.pathParameters.busId;
    let staff_id = event.pathParameters.staffId;
    const date = parseInt(event.queryStringParameters.d, 10);
    appointmentService.findBookedSlots(bus_id, staff_id).then((result) => {
       let response = util.success();
       response.body = JSON.stringify(result);
       console.log("success callback ", response);
       callback(null, response);
    }).catch( (error) => {
       let response = util.error();
       response.body = JSON.stringify(error);
       console.log("error callback ", response);
       callback(null, response);
    });
}

module.exports.getBusinessBookedAppointments = (event, context, callback) => {
    let busId = event.pathParameters.busid;
    let staffId = event.queryStringParameters.staffid;
    // expecting appointment date in milliseconds
    const _date = parseInt(event.queryStringParameters.appointmentdate, 10);
    let viewType = event.queryStringParameters ? event.queryStringParameters.viewtype : "day";

    appointmentService
       .getBusinessBookedAppointments(busId, staffId, _date, viewType)
        .then( (data) => {
            let response = util.success();
            response.body = JSON.stringify(data);
            callback(null, response);
        })
        .catch((error) => {
            let response = util.error();
            response.body = JSON.stringify(error);
            callback(null, response);
        });
}

module.exports.getSlotDetails = (event, context, callback) => {
    let slot_id = event.pathParameters.sId;
    let slotDataPromise = appointmentService.findSlotDetails(slot_id);
    slotDataPromise.then((result) => {
        let response = util.success();
        response.body = JSON.stringify(result);
        console.log("success callback ", response);
        callback(null, response);
     }).catch( (error) => {
       let response = util.error();
       response.body = JSON.stringify(error);
       console.log("error callback ", response);
       callback(null, response);
    });
 }