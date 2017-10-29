// Load the AWS SDK for Node.js
var DynamoDB = require('aws-sdk/clients/dynamodb');
var configDynamodb = require('../config/config-dynamodb');
// Create the DynamoDB service object
// ddb = new DynamoDB({apiVersion: '2012-10-08', region:'us-east-1', endpoint : 'http://localhost:8001'});
docClient = new DynamoDB.DocumentClient(configDynamodb.options);
    
module.exports.saveUser = (event, context, callback) => {

  console.log(event);
  let reqBody = JSON.parse(event.body);
  var params = {
    TableName: 'User',
    Item: reqBody.user
  };
 
 console.log("params_user "+  JSON.stringify(params));
    
    // Call DynamoDB to add the item to the table
    docClient.put(params, function(err, data) {
      if (err) {
        const response = {
          statusCode: 500,
          body: JSON.stringify(err),
        };
        callback(null, response);
      } else {
        console.log("data saved "+ data);
        const response = {
          statusCode: 200,
          headers : {"Access-Control-Allow-Origin" : "*"},
          body: JSON.stringify(data),
        };
        console.log("response "+ response);
        callback(null, response);
      }
    });


}