let db = require('../common/db');
let util = require('../common/util');
let Business = require('../model/business-model');
let staffService = require('./staff-service');

module.exports.getBusinessById = (busId, loadStaff) => {
    var params = {
        TableName: 'Business',
        Key: {
            'bus_id' : busId
        }
    };
    console.log("get Business params "+  JSON.stringify(params));
    let businessData = db.getData(params).then( (result) => {
        let business = new Business(result);
        
        return business.toJson();
    }).then( (business) => {
        if(loadStaff){
            let staffPromises = [];
            business.staffIds.forEach(staffId => {
                staffPromises.push(staffService.getStaffByBusIdAndStaffId(business.bus_id, staffId));
            });
            return Promise.all(staffPromises).then( (staffObjs) => {
                business.addAllStaff(staffObjs);
                return business;
            });
        }
        return business;
    });
    return businessData;
}

module.exports.saveBusiness = (busData) => {
    var params = {
        TableName: 'Business',
        Item: JSON.parse(busData, util.sanitizeDBValue)
    };
    let saveDataPromise = db.nxtId().then( (nextId) => {
        params.Item.bus_id = "b-test-"+nextId;
        return db.saveData(params); 
    }).catch((error) => {
       throw error;
    });
    return saveDataPromise;
}

module.exports.getBusinessExpenses = (busId, month, year, isyearly) => {
    var params = {
        TableName: 'Expense',
        KeyConditionExpression: "bus_id = :business_id",
        ExpressionAttributeValues: {
           ":business_id": busId
        }
     }; 
     console.log("getBusinessExpenses params", params);
     let expensePromise = db.queryData(params).then((result) => {
        return result;
     }).catch( (error) => {
        console.log("in error block ", error);
        return error;
     });
     return expensePromise;
}
