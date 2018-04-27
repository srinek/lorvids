'user strict';
let userApi = require('../src/api/user');
let userService = require('../src/services/user-service');

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


/* userApi.saveCognitoUser(testSaveCognitoUser, null, (error, response) => {
    console.log('-----------------------------GET RESPONSE START-----------------------------');
    console.log(response);
    console.log('-----------------------------GET RESPONSE END-----------------------------');
 }); */

 userService.updateBusinessRole('eyJraWQiOiJsQ1BTMHN3dVJSa1pUZXRCU2h5WHRxMGkzVG9tajZpMVlBTjBWZnU4VDk0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyZTc0NzlmYi1jNjk1LTQxODMtOTRjZS1iNTMxNjY2ZTNmZmUiLCJkZXZpY2Vfa2V5IjoidXMtZWFzdC0xXzk0NTY3YTVjLTI0ZWMtNDE3ZC05NzAxLTdiMzFhZTlkYzUwOCIsImV2ZW50X2lkIjoiNzY2YTE3NjMtNDk2Yy0xMWU4LTk5MzktM2Y2ZDM5YzZhZTM1IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTUyNDc1OTA4MiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfSDJKYVJBZGhWIiwiZXhwIjoxNTI0NzYyNjgyLCJpYXQiOjE1MjQ3NTkwODIsImp0aSI6IjhlMTAwZjczLTIyYWItNDJhZS1iNWE3LTU1OTAyMjRmMzdlMCIsImNsaWVudF9pZCI6InRhNDAydGx0ZmswZzN2c2ZjaXI0bTJnMzUiLCJ1c2VybmFtZSI6IjJlNzQ3OWZiLWM2OTUtNDE4My05NGNlLWI1MzE2NjZlM2ZmZSJ9.BQpzVq7uZFoE6eA6AuseVzxPMz_48BOc2aL8YzemJQuN9ffqgp03GbGL3cyMtT25bXxLfyRoKYbkS6WG9_voeqbjKFkOSfxfg1Z9pwQRyDLM_su0NK0NMyZHoR4eaS7Lc3BURa8NezOMbymaVAvvpZ8Gjl0JJczvBz2Bv83tYUcawuo0UVKlXNfPQ7WOTdDW6axshg6gTQTjsX5nzAGxecLIUitlJOTBdTfVrZhnfZdw76ZlqZQNCJfiBgUi2JaYNf0xFYo3eK9KVjelsKqow3lva_DIUcp5jpxqcaMbVqzqoMYno8TVGJNCHTaQf8nnxJCj7tDPu_pYM80hE817lA', 
 'b-test-76');