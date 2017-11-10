'use strict';
let DynamoDB = require('aws-sdk/clients/dynamodb');
let config = require('config');
let docClient = new DynamoDB.DocumentClient(config.get('app.ddbConfig'));

module.exports.saveData = (params, callback) => {
   let request =  docClient.put(params, function(err, data) {
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
            body: JSON.stringify(params),
          };
          console.log("success callback ", response);
          callback(null, response);
        }
    });

    console.log(" request ", request);
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

module.exports.nxtId = (callback) => {
  let params = {
    TableName: 'NxtId',
    Key: {
        "id": 0
    },
    UpdateExpression: "set nxtid = nxtid + :val",
    ExpressionAttributeValues:{
        ":val": 1
    },
    ReturnValues: "UPDATED_NEW"
  };
  docClient.update(params, function(err, data) {
    if (err) {
        console.log(" failed to generate next id :", JSON.stringify(err, null, 2));
    } 
    else {
        console.log(" generated next id data ", data );
        let nxtId = data.Attributes.nxtid; // <= here is our incremented result
        callback(nxtId);
    }
  });
}