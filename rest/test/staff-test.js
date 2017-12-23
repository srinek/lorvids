let staff = require('../src/api/staff');

let testGetAllObj = {
  "pathParameters": {
    "staffId": "b-test-01-s-01"
  }
};

staff.getAll(testGetAllObj  , 
     null, 
     (error, response) => {
        console.log('-----------------------------GET RESPONSE START-----------------------------');
        console.log(response);
        console.log('-----------------------------GET RESPONSE END-----------------------------');
     }
);

let testGetStaffObj = {
  "pathParameters": {
    "busId" : "b-test-01",
    "staffId": "b-test-01-s-01"
  }
};

/* staff.get(testGetStaffObj  , 
     null, 
     (error, response) => {
        console.log('-----------------------------GET RESPONSE START-----------------------------');
        console.log(response);
        console.log('-----------------------------GET RESPONSE END-----------------------------');
     }
); */

