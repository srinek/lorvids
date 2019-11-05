'use strict';
let db = require('../common/db');
let util = require('../common/util');
let sesService = require('./ses-service');
let businessService = require('./business-service');
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
                const hash = util.generateHash(userData.UserEmail);
                params.Item.status = "0"; // set the status to Inactive (0)
                params.Item.emailHash = hash;
                let saveUser = db.saveData(params);
                //generate hash from email. 
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
    if(data.saveAccessToken){
        userData.tokens = data.tokens;
    }
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

module.exports.getCognitoUser = (accessToken) => {
    var params = {
        AccessToken: accessToken /* required */
    };
    return new Promise( (resolve, reject) => {
        cognitoidentityserviceprovider.getUser(params, function(err, cognitoUser) { 
            if (err) {
                console.error(err, err.stack); // an error occurred
                reject(err);
            } 
            else {
                resolve(cognitoUser);
            }
        });
    });
    
}

module.exports.updateBusinessRole = (accessToken, businessId) => {
   
    this.getCognitoUser(accessToken).then( (cognitoUser) => {
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
    }).catch( (error) => {
        console.error(err, err.stack); // an error occurred
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

module.exports.findRouteAfterLogin = (accessToken) => {
    let self = this;
    return self.getCognitoUser(accessToken).then( (cognitoUser) => {
        let emailAttr = cognitoUser.UserAttributes.find((attr) => { return attr.Name === "email"});
        console.log("email ", emailAttr);
        return self.getUserDetails(emailAttr.Value).then( (userDetails) => {
            console.log(" userDetails ", userDetails);
            if(userDetails.role === "user"){
                return "viewAppts";
            }
            if(userDetails.role === "admin"){
                if(!userDetails.bus_id || userDetails.bus_id.length === 0){
                    return "addb";
                }
                else{
                   let busId = userDetails.bus_id[0];
                   return businessService.getBusinessById(busId).then( (businessDetails) => {
                       if(!businessDetails.services || businessDetails.services.length === 0) {
                          return "addsvc/"+businessDetails.bus_id;
                       }
                       if(!businessDetails.staff || businessDetails.staff.length === 0) {
                          return "addstaff/"+businessDetails.bus_id;
                       }
                       return "admin/dashboard";
                   }).catch( (error) => {
                      return error;
                   });
                }
            }
        }).catch( (error) => {
            return error;
        } );
   }).catch( (error) => {
        return error;
    });
}