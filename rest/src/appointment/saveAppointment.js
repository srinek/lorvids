// Load the AWS SDK for Node.js
var DynamoDB = require('aws-sdk/clients/dynamodb');
var configDynamodb = require('../config/config-dynamodb');
var User = require('../user/saveUser');
// Create the DynamoDB service object
// ddb = new DynamoDB({apiVersion: '2012-10-08', region:'us-east-1', endpoint : 'http://localhost:8001'});
docClient = new DynamoDB.DocumentClient(configDynamodb.options);
    
module.exports.saveAppointment = (event, context, callback) => {
    
    const save_user = event.queryStringParameters.saveuser;
    let reqBody = JSON.parse(event.body);
    var params_appt = {
      TableName: 'Appointments',
      Item: reqBody.appt
    };
 
 console.log("params_appt "+  JSON.stringify(params_appt));
    
    // Call DynamoDB to add the item to the table
    docClient.put(params_appt, function(err, data) {
      if (err) {
        const response = {
          statusCode: 500,
          body: JSON.stringify(err),
        };
        callback(null, response);
      } else {
        const response = {
          statusCode: 200,
          body: JSON.stringify(data),
        };
        if(save_user){
            User.saveUser(event, context, callback);
        }
        else{
            callback(null, response);
        }
      }
    });


}