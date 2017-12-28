'use strict';
let db = require('../common/db');
let util = require('../common/util');
let user = require('./user');
let appointmentService = require('../services/appointment-service');

module.exports.save = (event, context, callback) => {
    
    const save_user = event.queryStringParameters.saveuser;
    let reqBody = JSON.parse(event.body);
    appointmentService.saveAppointment(reqBody.appt).then( (result) => {
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