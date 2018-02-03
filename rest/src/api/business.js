'use strict';
let businessService = require('../services/business-service');
let util = require('../common/util');

module.exports.save = (event, context, callback) => {
    //console.log("new business save is called ", event);
    let saveDataPromise = businessService.saveBusiness(event.body, callback);
    saveDataPromise.then( (result) => {
        let response = util.success();
        response.body = JSON.stringify(result);
        console.log("success callback ", response);
        callback(null, response);
      }
    ).catch( (error) => {
        let response = util.error();
        response.body = JSON.stringify(error);
        console.log("error callback ", response);
        callback(null, response);
      }
    )
}

module.exports.get = (event, context, callback) => {
    let busId = event.pathParameters.busId;
    let loadStaff = event.queryStringParameters ? event.queryStringParameters.loadStaff : false;
    businessService
    .getBusinessById(busId, loadStaff)
    .then( (data) => {
        console.log("data ", data);
        let response = util.success();
        response.body = JSON.stringify(data);
        callback(null, response);
    })
    .catch((error) => {
        console.log("error "+error);
        let response = util.error();
        response.body = JSON.stringify(error);
        callback(null, response);
    });
}

module.exports.getBusinessExpenses = (event, context, callback) => {
    let busId = event.pathParameters.busId;
    let month = "";
    let year = "";
    let isyearly = "";
    let loadStaff = event.queryStringParameters ? event.queryStringParameters.loadStaff : false;
    businessService
    .getBusinessExpenses(busId, month, year, isyearly)
    .then( (data) => {
        console.log("data ", data);
        let response = util.success();
        response.body = JSON.stringify(data);
        callback(null, response);
    })
    .catch((error) => {
        console.log("error "+error);
        let response = util.error();
        response.body = JSON.stringify(error);
        callback(null, response);
    });
}