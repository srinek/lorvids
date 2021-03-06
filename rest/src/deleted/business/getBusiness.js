// Load the AWS SDK for Node.js
var DynamoDB = require('aws-sdk/clients/dynamodb');
var configDynamodb = require('../config/config-dynamodb');
ddb = new DynamoDB(configDynamodb.options);

module.exports.getBusiness = (event, context, callback) => {
    // Create the DynamoDB service object
    //console.log("business *** "+ JSON.stringify(event));
    var params = {
      TableName: 'Business',
      Key: {
        'bus_id' : {S: event.pathParameters.busId}
      }
    };
    
    // Call DynamoDB to add the item to the table
    ddb.getItem(params, function(err, data) {
      if (err) {
        console.log("error "+err);
        const response = {
          statusCode: 500,
          headers : {"Access-Control-Allow-Origin" : "*"},
          body: JSON.stringify(err),
        };
        callback(null, response);
      } else {
        console.log(DynamoDB.Converter.unmarshall(data.Item));
        const response = {
          statusCode: 200,
          headers : {"Access-Control-Allow-Origin" : "*"},
          body: JSON.stringify(DynamoDB.Converter.unmarshall(data.Item)),
        };
        callback(null, response);
      }
    });
}