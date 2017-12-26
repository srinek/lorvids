let db = require('../common/db');
let util = require('../common/util');

module.exports.saveUser = (userData) => {

    var params = {
        TableName: 'User',
        Item: userData
    };
       
    console.log("params_user "+  JSON.stringify(params));
          
    return db.saveData(params);
}