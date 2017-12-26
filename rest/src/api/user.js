'use strict';
let userService = require('../services/user-service');
let util = require('../common/util');

module.exports.save = (event, context, callback) => {
    
  let reqBody = JSON.parse(event.body);
  userService.saveUser(reqBody.user).then( (result) => {
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
    /* //console.log(event);
    let reqBody = JSON.parse(event.body);
    var params = {
      TableName: 'User',
      Item: reqBody.user
    };
     
    console.log("params_user "+  JSON.stringify(params));
        
    db.saveData(params, callback); */
}