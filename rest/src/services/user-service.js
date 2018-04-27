'use strict';
let db = require('../common/db');
let util = require('../common/util');
let sesService = require('./ses-service');
let config = require('config');
let CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider');
var cognitoidentityserviceprovider = new CognitoIdentityServiceProvider({apiVersion: '2016-04-18', region:"us-east-1"});
//var cognitoidentityserviceprovider = new CognitoIdentityServiceProvider(config.get('app.cognito-config'));




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

module.exports.saveCognitoUser = (data) => {
   
    console.log("data ", data);

    const userData = {};
    userData.UserEmail = data.email;
    userData.name = data.name;
    userData.status = "1";
    userData.role = data['custom:role'];
    var params = {
        TableName: 'User',
        Item: userData
    };
    console.log("params_user "+  JSON.stringify(params));
    return db.saveData(params).then( (result) => {
        //generate hash from email. 
        const hash = util.generateHash(userData.UserEmail);
        return saveVerificationCode(hash, userData.UserEmail);
    }).catch( (error) => {
        return error;
    });
}

module.exports.updateBusinessRole = (accessToken, businessId) => {
   

    var params = {
        AccessToken: accessToken /* required */
    };
    cognitoidentityserviceprovider.getUser(params, function(err, cognitoUser) {
        if (err) {
            console.error(err, err.stack); // an error occurred
        } 
        else {
            let emailAttr = cognitoUser.UserAttributes.find((attr) => { return attr.Name === "email"});
            if(emailAttr){
                var params = {
                    "TableName": 'User',
                    "Key": { "UserEmail" : emailAttr.Value },
                    "UpdateExpression": `set #bus_id = :bus_id`,
                    "ExpressionAttributeNames" : {
                     '#bus_id' : "bus_id"
                    },
                    "ExpressionAttributeValues": {
                     ':bus_id' : [businessId]
                   },
                   "ConditionExpression": "attribute_exists(UserEmail)",
                   "ReturnValues": "ALL_NEW"
                 };

                console.log("params_user "+  JSON.stringify(params));
                return db.updateData(params).then( (result) => {
                    console.log("admin business details updated", result);
                }).catch( (error) => {
                    console.error("error updating admin business details ", error);
                });
            }
        }
    });
      
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
            "TableName": 'User',
            "Key": { "UserEmail" : result.userEmail },
            "UpdateExpression": `set #status = :status`,
            "ExpressionAttributeNames" : {
             '#status' : "status"
            },
            "ExpressionAttributeValues": {
             ':status' : "1"
           },
           "ConditionExpression": "attribute_exists(UserEmail)",
           "ReturnValues": "ALL_NEW"
         };
        return db.updateData(params);
    }).catch( (error) => {
        return Promise.resolve("User Activation failed. User not exist");
    });
    return userActivation;
}