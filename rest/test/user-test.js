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

userApi.activateUser(activateUserObj, null, (error, response) => {
    console.log('-----------------------------GET RESPONSE START-----------------------------');
    console.log(response);
    console.log('-----------------------------GET RESPONSE END-----------------------------');
 });

