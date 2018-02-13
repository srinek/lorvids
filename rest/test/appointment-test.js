let appointment = require('../src/api/appointment');
let appointmentService = require('../src/services/appointment-service');

//appointmentService.findBookedSlots('b-test-01', 'b-test-01-s-01').then((result) => { console.log(result);});


/* 

Input params: businessId, string(month/week/day),Date object

output: {
  slots: {
    businessid :eee
    staffs : [
        {
         staff: id
         staff Name: sdsds
         appointments: [
            appointmnet:id
            appointment service:cavity
            appointment date:
            customer: {
              name:
              email,
              phone
            }

         ] 
        }
    ]
  }

}

 */
//appointmentService.findBusinessBookedSlots('b-test-01', 'day', 1516107407118).then((result) => { console.log(result);});


let reqBody = {
  "user": {
    "UserEmail": "srinek@gmail.com",
    "name": "Nandakishore Nekkanti",
    "phone": "17323182848"
  },
  "appt": {
    "staffId": "b-test-01-s-01",
    "userEmail": "srinek@gmail.com",
    "busId": "b-test-01",
    "location": "110 Main Street, Edison, NJ 08817",
    "time": "2018-02-12T20:30:00.000Z",
    "notes": "NONE",
    "service": "Dental Cleaning"/*,
    "AppointmentId": "b-test-01-s-02-1518276600000-cba9fbd9"*/
  }
};

let updateObj = {
  "queryStringParameters": {
    "saveuser": true
  },
  "body": JSON.stringify(reqBody)
};
appointment.createNew(updateObj , null, (error, response) => {
  console.log('-----------------------------SAVE RESPONSE START-----------------------------');
  console.log(response);
  console.log('-----------------------------SAVE RESPONSE END-----------------------------');
});



let creatReqBody = {
  "appt": {
    "staffId": "b-test-01-s-01",
    "busId": "b-test-01",
    "time": "1517747168193",
  }
};

let createObj = {
  "body": JSON.stringify(creatReqBody)
};

/* appointment.createNew(createObj , null, (error, response) => {
  console.log('-----------------------------SAVE RESPONSE START-----------------------------');
  console.log(response);
  console.log('-----------------------------SAVE RESPONSE END-----------------------------');
}); */

let testGetObj = { "pathParameters" : 
  {
      "sId" : "b-test-01-s-01-1517931000000",
  }
};
/* appointment.getSlotDetails(testGetObj , null, (error, response) => {
  console.log('-----------------------------SAVE RESPONSE START-----------------------------');
  console.log(response);
  console.log('-----------------------------SAVE RESPONSE END-----------------------------');
}); */

/* appointmentService.findAvailableSlots('b-test-01', 'b-test-01-s-01').then((result) => {
  console.log("all slots", result);
}); */


/*  appointment.getAllAppointments(
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
 );  */
