'use strict';
let db = require('../common/db');
let util = require('../common/util');
let sesService = require('./ses-service');



module.exports.saveUser = (userData) => {

    var params = {
        TableName: 'User',
        Item: userData
    };
       
    console.log("params_user "+  JSON.stringify(params));
    if(userData.UserEmail) {
        let userPromise = this.getUserDetails(userData.UserEmail).then( (userDetails) => {
            console.log("userEmail %j  userdetails %j", userData.UserEmail, userDetails);
            if(!userDetails){ // result is undefined 
                params.Item.status = "0"; // set the status to Inactive (0)
                let saveUser = db.saveData(params);
                //generate hash from email. 
                const hash = util.generateHash(userData.UserEmail);
                saveVerificationCode(hash, userData.UserEmail).then( () => {
                    //send verification email.
                    sesService.sendUserVerificationEmail(hash, userData);
                });
                
                return saveUser;
            }
            else{
                return Promise.resolve("user already exist");
            }
        }).catch ( (error) => {
            console.error("error while getUserDetails", error);
            return Promise.resolve(error);
        })
        return userPromise;
    }
    // user already saved.
    return Promise.resolve("user email not exist in request");;
}

let saveVerificationCode = (emailHash, userEmail) => {
    var params = {
        TableName: 'UserVerification',
        Item: {"user-email-hash": emailHash, "userEmail": userEmail}
    };
    return db.saveData(params);
}

module.exports.getUserDetails = (userEmail) => {
    var params = {
        TableName: 'User',
        Key: {
            'UserEmail' : userEmail
        }
    };
    console.log("get user params "+  JSON.stringify(params));
    let userData = db.getData(params);
    return userData;
}

module.exports.activateUser = (emailHash) => {
    var params = {
        TableName: 'UserVerification',
        Key: {
            'use-email-hash' : emailHash
        }
    };
    console.log("get UserActivation params "+  JSON.stringify(params));
    let  userActivation = db.getData(params);
    userActivation.then( (result) => {
        var params = {
            TableName: 'User',
            Item: {"UserEmail": result.userEmail, "status" : "1"}
        };
        return db.saveData(params);
    }).catch( (error) => {
        return Promise.resolve("User Activation failed. User not exist");
    });
    return userActivation;
}