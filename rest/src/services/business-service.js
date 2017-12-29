let db = require('../common/db');
let util = require('../common/util');
let Business = require('../model/business-model');

module.exports.getBusinessById = (busId) => {
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