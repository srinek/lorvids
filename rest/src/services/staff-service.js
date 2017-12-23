let db = require('../common/db');
let util = require('../common/util');
let businessService = require('./business-service');

module.exports.getStaffByBusIdAndStaffId = (busId, staffId) => {
    var params = {
        TableName: 'Staff',
        Key: {
          'bus_id' : busId,
          'staff_id' : staffId
        }
    }; 
    console.log("staff params", params);
    return db.getData(params);
}

module.exports.getStaffByStaffId = (staffId) => {
    var params = {
       TableName: 'Staff',
       KeyConditionExpression: "#staff_id = :staff_id",
       ExpressionAttributeNames:{
          "#staff_id": "staff_id"
       },
       ExpressionAttributeValues: {
          ":staff_id": staffId
       }
    }; 
    console.log("getStaffByStaffId params", params);
    let staffPromise = db.queryData(params).then((response) => {
       //console.log("staff query resolved ", response);
       return doAfterStaffGetAll(response);
    }).catch( (error) => {
       console.log("in error block ", error);
       return error;
    });
    return staffPromise;
}

let doAfterStaffGetAll = (staffItems) => {
    let busPromises = [];
    staffItems.forEach(element => {
        busPromises.push(businessService.getBusinessById(element.bus_id));
    });
    let newStaffObj = [];
    return Promise.all(busPromises).then((busValues) => {
        busValues.forEach((business) => {
            let staff = staffItems.find( (elem) => { return elem.bus_id === business.bus_id});
            staff.business = business;
            newStaffObj.push(staff);
        });
        console.log("new staff ", newStaffObj);
        return newStaffObj;
    });
}