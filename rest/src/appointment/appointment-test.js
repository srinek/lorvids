var saveAppointment = require('./saveAppointment');
saveAppointment.saveAppointment(
  {
    "appt": {
    "StaffId": "b-test-02-s-02",
    "UserEmail": "ritesh@gmail.com",
    "apptId": "b-test-02-s-02-a-1400",
    "busId": "b-test-02",
    "location": "business address",
    "notes": "empty",
    "service": "dental cleaning"
    },
    "user": {
    "UserEmail": "retesh@gmail.com",
    "name": "ritesh nekkanti",
    "phone": "9784441121"
    }
  }, 
    null, 
    (error, response) => {
        console.log('-----------------------------SAVE RESPONSE START-----------------------------');
        console.log(response);
        console.log('-----------------------------SAVE RESPONSE END-----------------------------');
    }
);
