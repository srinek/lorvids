// Load the AWS SDK for Node.js
var DynamoDB = require('aws-sdk/clients/dynamodb');
var configDynamodb = require('../config/config-dynamodb');
// Create the DynamoDB service object
// ddb = new DynamoDB({apiVersion: '2012-10-08', region:'us-east-1', endpoint : 'http://localhost:8001'});
ddb = new DynamoDB(configDynamodb.options);
    
module.exports.saveBusiness = (event, context, callback) => {
    
    var params = {
      TableName: 'Business',
      Item: event.Item
    };

    
    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
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
        callback(null, response);
      }
    });


}