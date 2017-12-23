'use strict';
let util = require('../common/util');
let staffService = require('../services/staff-service');

module.exports.get = (event, context, callback) => {
    //console.log("staff *** "+ JSON.stringify(event));
    
    staffService.getStaffByBusIdAndStaffId(
        event.pathParameters.busId, 
        event.pathParameters.staffId).then( (result) => {
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

module.exports.getAll = (event, context, callback) => {
    
    let allPromise = staffService.getStaffByStaffId(event.pathParameters.staffId); 
    allPromise.then( (result) => {
        let response = util.success();
        response.body = JSON.stringify(result);
        console.log("success callback ", response);
        callback(null, response);
    }).catch((error) => {
        let response = util.error();
        response.body = JSON.stringify(error);
        console.log("error callback ", response);
        callback(null, response);
    });
    /* var params = {
      TableName: 'Staff',
      KeyConditionExpression: "#staff_id = :staff_id",
      ExpressionAttributeNames:{
         "#staff_id": "staff_id"
      },
      ExpressionAttributeValues: {
         ":staff_id": event.pathParameters.staffId
      }
    }; 
    console.log("staff params", params);
    
    db.queryData(params).then((response) => {
       console.log("staff query resolved ", response);
       doAfterStaffGetAll(response, callback);
    }); */
}

let doAfterStaffGetAll = (response, callback) => {
    let promises = [];
    let items = JSON.parse(response.body);
    items.forEach(element => {
        promises.push(new Promise((resolve, reject) => {
            business.get({"pathParameters": {"busId" : element.bus_id}}, null, (context,busResp) => {  
                element.business = busResp.body;
                resolve(element);
            });
        }));
    });
    let newStaffObj = [];
    Promise.all(promises).then((staffValues) => {
        staffValues.forEach((staff) => {
            newStaffObj.push(staff);
        });
        response.body = JSON.stringify(newStaffObj);
        callback(null, response);
    });
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