var DynamoDB = require('aws-sdk/clients/dynamodb');
var configDynamodb = require('../config/config-dynamodb');
ddb = new DynamoDB(configDynamodb.options);

module.exports.getStaff = (event, context, callback) => {
    // Create the DynamoDB service object
    console.log("staff *** "+ JSON.stringify(event));
   
    var params = {
      TableName: 'Staff',
      Key: {
        'bus_id' : {S: event.pathParameters.busId},
        'staff_id' : {S: event.pathParameters.staffId}
      }
    }; 
    
    console.log(params);
    
    // Call DynamoDB to get the item from the table
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
          headers : {"Access-Control-Allow-Origin" : "*"},
          body: JSON.stringify(DynamoDB.Converter.unmarshall(data.Item))
        };
        callback(null, response);
      }
    });
}