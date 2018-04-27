'use strict';
let userService = require('../services/user-service');
let util = require('../common/util');

module.exports.save = (event, context, callback) => {
    
  let reqBody = JSON.parse(event.body);
  userService.saveUser(reqBody.user).then( (result) => {
      console.log("save user result ", result);
      let response = util.success();
      response.body = JSON.stringify({"status":"success"});
      console.log("result ", response);
      callback(null, response);
    }).catch( (error) => {
      let response = util.error();
      response.body = JSON.stringify(error);
      console.log("error callback ", response);
      callback(null, response);
    });
    /* //console.log(event);
    let reqBody = JSON.parse(event.body);
    var params = {
      TableName: 'User',
      Item: reqBody.user
    };
     
    console.log("params_user "+  JSON.stringify(params));
        
    db.saveData(params, callback); */
}

module.exports.get = (event, context, callback) => {
   
    let userEmail = event.pathParameters.userEmail;
    let userDataPromise = userService.getUserDetails(userEmail);
    userDataPromise.then((result) => {
        console.log("result ", result);
        let response = util.success();
        response.body = JSON.stringify(result);
        console.log("success callback ", response);
        callback(null, response);
     }).catch( (error) => {
       let response = util.error();
       response.body = JSON.stringify(error);
       console.log("error callback ", response);
       callback(null, response);
    });
} 

module.exports.activateUser = (event, context, callback) => {
  let emailHash = event.pathParameters.emailHash;
  userService.activateUser(emailHash).then( (result) => {
    let response = util.success();
    response.body = JSON.stringify({"status":"success"});
    console.log("success callback ", response);
    callback(null, response);
  }).catch( (error) => {
    let response = util.error();
    response.body = JSON.stringify(error);
    console.error("error callback ", response);
    callback(null, response);
  });
}

module.exports.saveCognitoUser = (event, context) => {
  console.log("cognito event ", event);
  userService.saveCognitoUser(event.request.userAttributes).then( (result) => {
      console.log("save user result ", result);
      context.done(null, event);
  }).catch( (error) => {
      console.log("error callback ", response);
      context.done(error, event);
  });
}