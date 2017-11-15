'use strict';
let DynamoDB = require('aws-sdk/clients/dynamodb');
let config = require('config');
let docClient = new DynamoDB.DocumentClient(config.get('app.ddbConfig'));
let util = require('./util');

module.exports.saveData = (params, callback) => {
   let request =  docClient.put(params, function(err, data) {
        if (err) {
          let response = util.error();
          response.body = JSON.stringify(err);
          console.log("error callback ", response);
          callback(null, response);
        } else {
          let response = util.success();
          response.body = JSON.stringify(params);
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
      let response = util.error();
      response.body = JSON.stringify(err);
      callback(null, response);
    } else {
      console.log("data ", data.Item);
      let response = util.success();
      response.body = JSON.stringify(data.Item);
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