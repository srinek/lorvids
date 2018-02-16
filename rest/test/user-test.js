'user strict';
let userApi = require('../src/api/user');

let testGetObj = { "pathParameters" : 
                    {
                        "userEmail" : "srinek@gmail.com",
                    }
                 };
userApi.get(testGetObj  , 
     null, 
     (error, response) => {
        console.log('-----------------------------GET RESPONSE START-----------------------------');
        console.log(response);
        console.log('-----------------------------GET RESPONSE END-----------------------------');
     }
);