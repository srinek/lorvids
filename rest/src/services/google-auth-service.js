'use strict';
const {google} = require('googleapis');
process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/";
const config = require('config');
const userService = require('../services/user-service');

const oauth2Client = new google.auth.OAuth2(
    config.get('app.googleapi.auth').client_id,
    config.get('app.googleapi.auth').client_secret,
    config.get('app.googleapi.auth').redirect_url
);

module.exports.oauth2Client = oauth2Client;

const scopes = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/calendar'
];

module.exports.generateAuthURL = () => {
    return  oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        // If you only need one scope you can pass it as a string
        scope: scopes
    });
}

//get the access token and refresh token and save them to DB.
module.exports.generateTokens = async (code) => {
    var self = this;
    try{
        let {tokens} = await oauth2Client.getToken(code);
        //console.log("tokens ", tokens);
        //oauth2Client.setCredentials(tokens);
        self.saveTokens(tokens);
    }
    catch(e){
        console.error("error getting tokens ", e);
    }
}

module.exports.saveTokens = async (tokens) => {
    try{
        oauth2Client.setCredentials(tokens);
        const plus = google.plus({version:'v1', auth: oauth2Client});
        const reponse = await plus.people.get({userId: 'me'})
        const googleUserData = reponse.data;
        if(googleUserData){
            console.log("plus ", googleUserData.displayName);
            let userData = {};
            if(googleUserData.emails && googleUserData.emails.length > 0){
                googleUserData.emails.forEach( (googleEmail) => {
                    if(googleEmail.type === "account"){
                        userData.UserEmail = googleEmail.value;
                    }
                });
            }
            userData.name = googleUserData.displayName;
            userData['custom:role'] = 'admin';
            userData.saveAccessToken = true;
            userData.tokens  = tokens;
            userService.saveCognitoUser(userData);
        }
    }
    catch(e){
        console.error("error getting profile ", e);
    }
}