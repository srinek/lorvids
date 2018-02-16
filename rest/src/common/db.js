'use strict';
let DynamoDB = require('aws-sdk/clients/dynamodb');
let config = require('config');
//let docClient = new DynamoDB.DocumentClient(config.get('app.ddbConfig'));
let docClient = new DynamoDB.DocumentClient({"apiVersion": "2012-10-08", "region":"us-east-1"});

let util = require('./util');

module.exports.saveData = (params) => {
  return new Promise((resolve, reject) => {
    let request =  docClient.put(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(params);
      }
    });
    //console.log(" request ", request);
  });
} 

module.exports.getData = (params) => {
  return new Promise((resolve, reject) => {
    docClient.get(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.Item);
      }
    });
  });  
}

module.exports.queryData = (params) => {
  return new Promise((resolve, reject) => {
    docClient.query(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });
}

module.exports.nxtId = () => {
  return new Promise((resolve, reject) => {
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
          reject(err);
      } 
      else {
          resolve(data.Attributes.nxtid);
      }
    });
  });
}