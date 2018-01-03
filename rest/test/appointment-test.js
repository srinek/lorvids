let appointment = require('../src/api/appointment');
let appointmentService = require('../src/services/appointment-service');

//appointmentService.findBookedSlots('b-test-01', 'b-test-01-s-01').then((result) => { console.log(result);});


let reqBody = {
  "appt": {
    "StaffId": "b-test-01-s-01",
    "UserEmail": "nanda@gmail.com",
    "AppointmentId": "b-test-01-s-01-a-1400",
    "busId": "b-test-01",
    "location": "business address",
    "notes": "empty",
    "service": "dental cleaning"
  },
  "user": {
    "UserEmail": "nanda@gmail.com",
    "name": "nanda nekkanti",
    "phone": "9784441111"
  }
};

let saveObj = {
  "queryStringParameters": {
    "saveuser": "true"
  },
  "body": JSON.stringify(reqBody)
};
/* appointment.save(saveObj , null, (error, response) => {
  console.log('-----------------------------SAVE RESPONSE START-----------------------------');
  console.log(response);
  console.log('-----------------------------SAVE RESPONSE END-----------------------------');
}); */
//var saveAppointment = require('./saveAppointment');
/* saveAppointment.saveAppointment(
  , 
    null, 
    (error, response) => {
        console.log('-----------------------------SAVE RESPONSE START-----------------------------');
        console.log(response);
        console.log('-----------------------------SAVE RESPONSE END-----------------------------');
    }
); */

/* appointmentService.findAvailableSlots('b-test-01', 'b-test-01-s-01').then((result) => {
  console.log("all slots", result);
}); */
appointment.getAllAppointments(
  {
    "queryStringParameters": { "d": "" },
    "pathParameters": { "busId": "b-test-01", "staffId": "b-test-01-s-01" }
    }, 
   null, 
   (error, response) => {
    console.log('-----------------------------SAVE RESPONSE START-----------------------------');
    console.log(response);
    console.log('-----------------------------SAVE RESPONSE END-----------------------------');
  }
); 