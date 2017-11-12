'use strict';
let db = require('../common/db');
let util = require('../common/util');

module.exports.save = (event, context, callback) => {
    
      //console.log(event);
    let reqBody = JSON.parse(event.body);
    var params = {
      TableName: 'User',
      Item: reqBody.user
    };
     
    console.log("params_user "+  JSON.stringify(params));
        
    db.saveData(params, callback);
}