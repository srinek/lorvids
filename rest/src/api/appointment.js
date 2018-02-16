'use strict';
let db = require('../common/db');
let util = require('../common/util');
let user = require('./user');
let appointmentService = require('../services/appointment-service');
let emailService = require('../services/ses-service');

module.exports.save = (event, context, callback) => {
    
    const save_user = event.queryStringParameters.saveuser;
    let reqBody = JSON.parse(event.body);
    appointmentService.saveAppointment(reqBody.appt).then( (result) => {
        emailService.sendConfirmationEmail(reqBody.appt, reqBody.user);
        if(save_user){
            user.save(event, context, callback);
         }
         else{
            let response = util.success();
            response.body = JSON.stringify(result);
            console.log("success callback ", response);
            callback(null, response);
         }
    }).catch( (error) => {
        let response = util.error();
        response.body = JSON.stringify(error);
        console.log("error callback ", response);
        callback(null, response);
    });


    /* var params_appt = {
      TableName: 'Appointments',
      Item: reqBody.appt
    };
 
    console.log("params_appt "+  JSON.stringify(params_appt));
    
    db.nxtId(
        (generatedId) => {
            params_appt.Item.apptId = params_appt.Item.StaffId+"-a-"+generatedId;
           console.log("params "+  JSON.stringify(params_appt));
           db.saveData(params_appt, (error, response) => {
              if(response.statusCode === 500){
                   callback(null, response);
              }
              else{
                  if(save_user){
                      user.save(event, context, callback);
                   }
                   else{
                       callback(null, response);
                   }
              }
           });
        }
     ); */
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
    let month = event.queryStringParameters ? event.queryStringParameters.month : "";
    let year = event.queryStringParameters ? event.queryStringParameters.year : "";
    let isyearly = event.queryStringParameters ? event.queryStringParameters.isyearly : false;

    appointmentService
    .getBusinessBookedAppointments(busId, month, year, isyearly)
    .then( (data) => {
        console.log("data ", data);
        let response = util.success();
        response.body = JSON.stringify(data);
        callback(null, response);
    })
    .catch((error) => {
        console.log("error "+error);
        let response = util.error();
        response.body = JSON.stringify(error);
        callback(null, response);
    });
}