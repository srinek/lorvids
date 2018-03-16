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
        //emailService.sendConfirmationEmail(appt, userObj);
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
    let busId = event.pathParameters.busId;
    let staffId = event.queryStringParameters.staffid;
    // expecting appointment date in milliseconds
    const _date = parseInt(event.queryStringParameters.appointmentdate, 10);
    console.log("queryString:",_date);

    let viewType = event.queryStringParameters ? event.queryStringParameters.viewtype : "day";
    console.log("queryString viewType:",viewType);

    appointmentService
       .getBusinessBookedAppointments(busId, staffId, _date, viewType)
        .then( (data) => {
            console.log("in SUCCESS");
            let response = util.success();
            response.body = JSON.stringify(data);
            console.log("suc: resp:", response);
            callback(null, response);
        })
        .catch((error) => {
            console.log("in ERROR");
            let response = util.error();
            response.body = JSON.stringify(error);
            console.log("in ERROR:", response);
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

module.exports.getAllAppointmentsByAppointmentId = (event, context, callback) => {
    let slot_id = event.pathParameters.sId;
    let appointmentByIdPromise = appointmentService.getAllAppointmentsByAppointmentId(slot_id);
    appointmentByIdPromise.then( (data) => {
        let response = util.success();
        response.body = JSON.stringify(data);
        callback(null, response);
    }).catch( (error) => {
        let response = util.error();
        response.body = JSON.stringify(error);
        console.log("error callback ", response);
        callback(null, response);
    });
    
 }

 module.exports.cancel = (event, context, callback) => {
    let slot_id = event.pathParameters.sId;
    let cancelApptPromise = appointmentService.cancelAppointment(slot_id);
    cancelApptPromise.then( (result) => {
        let response = util.success();
        response.body = JSON.stringify({result : "success"});
        console.log("success callback from cancel appointment", response);
        callback(null, response);
    }).catch( (error) => {
       let response = util.error();
       response.body = JSON.stringify({result : "failed"});
       console.log(`cancel appointment failed for ${slot_id} with error %j`, error);
       callback(null, response);
    });
 }