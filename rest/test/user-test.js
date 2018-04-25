'user strict';
let userApi = require('../src/api/user');

let testGetObj = { "pathParameters" : 
                    {
                        "userEmail" : "f@gmail.com",
                    }
                 };
/* userApi.get(testGetObj  , 
     null, 
     (error, response) => {
        console.log('-----------------------------GET RESPONSE START-----------------------------');
        console.log(response);
        console.log('-----------------------------GET RESPONSE END-----------------------------');
     }
); */

const activateUserObj = { "pathParameters" : 
    {
        "emailHash" : "05c64452ae7a95de31bbe3be52699ad9",
    }
};

/* userApi.activateUser(activateUserObj, null, (error, response) => {
    console.log('-----------------------------GET RESPONSE START-----------------------------');
    console.log(response);
    console.log('-----------------------------GET RESPONSE END-----------------------------');
 }); */

const testSaveCognitoUser = { version: '1',
region: 'us-east-1',
userPoolId: 'us-east-1_H2JaRAdhV',
userName: 'a9582a69-f546-4045-beb6-838dd536d676',
callerContext: 
{ awsSdkVersion: 'aws-sdk-unknown-unknown',
clientId: 'ta402tltfk0g3vsfcir4m2g35' },
triggerSource: 'PostConfirmation_ConfirmSignUp',
request: 
{ userAttributes: 
{ sub: 'a9582a69-f546-4045-beb6-838dd536d676',
'cognito:email_alias': 'nkishorenekkanti@gmail.com',
'cognito:user_status': 'CONFIRMED',
email_verified: 'true',
name: 'Nanda Testing',
'custom:role': 'admin',
email: 'nkishorenekkanti@gmail.com' } },
response: {} };
userApi.saveCognitoUser(testSaveCognitoUser, null, (error, response) => {
    console.log('-----------------------------GET RESPONSE START-----------------------------');
    console.log(response);
    console.log('-----------------------------GET RESPONSE END-----------------------------');
 });