var saveAppointment = require('./saveAppointment');
saveAppointment.saveAppointment(
    {
        "queryStringParameters": {
          "saveuser": "true"
        },
        "body": {
          "appt": {
            "StaffId": "b-test-01-s-02",
            "UserEmail": "nanda@gmail.com",
            "apptId": "b-test-01-s-01-a-1400",
            "busId": "b-test-01",
            "location": "business address",
            "notes": "empty",
            "service": "dental cleaning"
          },
          "user": {
            "UserEmail": "nanda1@gmail.com",
            "name": "nanda1 nekkanti",
            "phone": "9784441121"
          }
        }
    }, 
    null, 
    (error, response) => {
        console.log('-----------------------------SAVE RESPONSE START-----------------------------');
        console.log(response);
        console.log('-----------------------------SAVE RESPONSE END-----------------------------');
    }
);
