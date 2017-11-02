var DynamoDB = require('aws-sdk/clients/dynamodb');
var configDynamodb = require('../config/config-dynamodb');
docClient = new DynamoDB.DocumentClient(configDynamodb.options);

module.exports.saveData = (params, callback) => {
    docClient.put(params, function(err, data) {
        if (err) {
          const response = {
            statusCode: 500,
            headers : {"Access-Control-Allow-Origin" : "*"},
            body: JSON.stringify(err),
          };
          console.log("error callback ", response);
          callback(null, response);
        } else {
          const response = {
            statusCode: 200,
            headers : {"Access-Control-Allow-Origin" : "*"},
            body: JSON.stringify(data),
          };
          console.log("success callback ", response);
          callback(null, response);
        }
    });
} 


module.exports.getData = (params, callback) => {
  docClient.get(params, function(err, data) {
    if (err) {
      console.log("error "+err);
      const response = {
        statusCode: 500,
        headers : {"Access-Control-Allow-Origin" : "*"},
        body: JSON.stringify(err),
      };
      callback(null, response);
    } else {
      console.log("data ", data.Item);
      const response = {
        statusCode: 200,
        headers : {"Access-Control-Allow-Origin" : "*"},
        body: JSON.stringify(data.Item),
      };
      callback(null, response);
    }
  });
}