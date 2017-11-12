'use strict';
let db = require('../common/db');
let util = require('../common/util');

module.exports.save = (event, context, callback) => {
    //console.log("new business save is called ", event);
    var params = {
      TableName: 'Business',
      Item: JSON.parse(event.body, util.sanitizeDBValue)
    };
    db.nxtId(
       (generatedId) => {
          params.Item.bus_id = "b-test-"+generatedId;
          console.log("params "+  JSON.stringify(params));
          db.saveData(params, callback);
       }
    );
    
}

module.exports.get = (event, context, callback) => {

    //console.log("business *** "+ JSON.stringify(event));
    var params = {
      TableName: 'Business',
      Key: {
        'bus_id' : event.pathParameters.busId
      }
    };
    console.log("params "+  JSON.stringify(params));
    db.getData(params, callback);
}