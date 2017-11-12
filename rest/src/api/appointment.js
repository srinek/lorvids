'use strict';
let db = require('../common/db');
let util = require('../common/util');
let user = require('./user');

module.exports.save = (event, context, callback) => {
    
    const save_user = event.queryStringParameters.saveuser;
    let reqBody = JSON.parse(event.body);
    var params_appt = {
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
     );
}