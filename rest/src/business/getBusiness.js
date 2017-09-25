// Load the AWS SDK for Node.js
var DynamoDB = require('aws-sdk/clients/dynamodb');
var configDynamodb = require('../config/config-dynamodb');
ddb = new DynamoDB(configDynamodb.options);

module.exports.getBusiness = (event, context, callback) => {
    // Create the DynamoDB service object
    console.log("business id "+event.busId);
    var params = {
      TableName: 'Business',
      Key: {
        'BusId' : {S: event.busId}
      }
    };
    
    // Call DynamoDB to add the item to the table
    ddb.getItem(params, function(err, data) {
      if (err) {
        console.log("error "+err);
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