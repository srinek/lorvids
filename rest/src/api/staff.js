'use strict';
let db = require('../common/db');
let util = require('../common/util');

module.exports.get = (event, context, callback) => {
    //console.log("staff *** "+ JSON.stringify(event));
    
    var params = {
      TableName: 'Staff',
      Key: {
        'bus_id' : event.pathParameters.busId,
        'staff_id' : event.pathParameters.staffId
      }
    }; 
    console.log("staff params", params);
    
    db.getData(params, callback);
}

module.exports.save = (event, context, callback) => {
    
      
    var params = {
        TableName: 'Staff',
        Item: JSON.parse(event.body)
    };
     
    console.log("params "+  JSON.stringify(params));
        
    db.nxtId(
        (generatedId) => {
           params.Item.staff_id = params.Item.bus_id+"-s-"+generatedId;
           console.log("params "+  JSON.stringify(params));
           db.saveData(params, callback);
        }
     );
    
}