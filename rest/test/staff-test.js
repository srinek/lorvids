let staff = require('../src/api/staff');

let testGetAllObj = {
  "pathParameters": {
    "staffId": "b-test-01-s-01"
  }
};

/* staff.getAll(testGetAllObj  , 
     null, 
     (error, response) => {
        console.log('-----------------------------GET RESPONSE START-----------------------------');
        console.log(response);
        console.log('-----------------------------GET RESPONSE END-----------------------------');
     }
); */

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


let testSaveObj = {
  "body": JSON.stringify({"images":["b-test-02-test-pediatric.png"],"staff":[{"staff_id":"b-test-02-s-01","staff_name":"Dr. Devi","staff_email":"s@s.com","staff_phone":"7876765656","rating":5,"tags":"DDS from RSDM, fellow in oro facial pain","practices":[],"image":"","awards":"","staff_languages":"","holidays":["SAT"]},{"staff_id":"b-test-02-s-02","staff_name":"Kartheek","rating":5,"tags":"general practiotioner","practices":[],"image":"","awards":"","staff_languages":""},{"staff_id":"","staff_name":"Dr. Dorababu","staff_email":"dorababu@lorvids.com","staff_phone":"54545445435","rating":5,"tags":"cool","practices":[],"images":[],"image":"","personalStatement":"cool","affiliations":"","awards":"cool","staff_languages":"English","bus_hours":[{"day":2,"startTime":"12:30 AM","endTime":"10:45 PM"},{"day":3,"startTime":"12:30 AM","endTime":"11:15 PM"},{"day":4,"startTime":"12:15 AM","endTime":"11:30 PM"},{"day":5,"startTime":"12:15 AM","endTime":"11:15 PM"},{"day":6,"startTime":"12:15 AM","endTime":"11:30 PM"},{"day":7,"startTime":"12:00 AM","endTime":"11:45 PM"}],"holidays":{"dates":[],"weekdays":[1]}}],"bus_time_zone":"EST","bus_hours":[{"day":-1,"startTime":"10:00","endTime":"17:00"},{"day":7,"startTime":"09:00","endTime":"13:00"}],"holidays":{"dates":["07-04-2018","09-04-2018","11-25-2018"],"weekdays":[4]},"statement_caption":"","statement_notes":"","specialized_in":"pediatric needs","awards":"NJ Best Dental 2017","appointment_instructions":"insurance required. appointments needed","services":[{"name":"Dental Cleaning","cost":"100","duration":"","description":""},{"name":"Root Canal Treatment","cost":"200","duration":"","description":""},{"name":"Cavities","cost":"50","duration":"","description":""},{"name":"Teeth Pain","cost":"2500","duration":"","description":""},{"name":"Amalgam Treatments","cost":"300","duration":"","description":""}],"bus_name":"Rainbow Pediatrics Dental","address":"220 Second Street, Piscataway, NJ 08857","bus_id":"b-test-02","phone":"9890001111","defaultImage":"b-test-02-test-pediatric.png","category":"Health Care"})
};

staff.save(testSaveObj, 
  null, 
  (error, response) => {
      console.log('-----------------------------SAVE RESPONSE START-----------------------------');
      console.log(response);
      console.log('-----------------------------SAVE RESPONSE END-----------------------------');
  }
);