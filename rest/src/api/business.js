'use strict';
let businessService = require('../services/business-service');
let util = require('../common/util');

module.exports.save = (event, context, callback) => {
    //console.log("new business save is called ", event);
    let saveDataPromise = businessService.saveBusiness(event.body, callback);
    saveDataPromise.then( (result) => {
        let response = util.success();
        response.body = JSON.stringify({"result" : "success", "bus_id":result.Item.bus_id});
        console.log("result ", result);
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

module.exports.update = (event, context, callback) => {
    let busId = event.pathParameters.busId;
    let saveDataPromise = businessService.updateBusiness(busId, event.body);
    saveDataPromise.then( (result) => {
        let response = util.success();
        response.body = JSON.stringify({"result" : "success"});
        console.log("result ", result);
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
    let month = event.queryStringParameters ? event.queryStringParameters.month : "";
    let year = event.queryStringParameters ? event.queryStringParameters.year : "";
    let isyearly = event.queryStringParameters ? event.queryStringParameters.isyearly : false;

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