var BusinessGet = require('./getBusiness');
var BusinessSave = require('./saveBusiness');
BusinessSave.saveBusiness(
    {
        "body" : {
          "bus_id": "b-test-04",
          "bus_name": "KK Dental",
          "address": "110 First Street, Newyork, NY 08854",
          "phone": "9890005555",
          "category": "Health Care",
          "statement_caption": "Practice Mission",
          "statement_notes": "smile with confidence",
          "specialized_in": "dental needs",
          "appointment_instructions": "insurance or by cash",
          "awards": "best dental NJ 2011",
          "bus_time_zone": "EST",
          "bus_hours": [
            {
              "day": "ALL",
              "time": "10AM - 5PM"
            },
            {
              "day": "SAT",
              "time": "9AM - 1PM"
            }
          ],
          "holidays": {
            "weekdays": [
              0,
              4
            ],
            "dates": [
              1507825795220,
              1507825795221,
              1507825795222
            ]
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

/* BusinessGet.getBusiness({bus_id : '004'}, null, (error, response) => {
    console.log('-----------------------------GET RESPONSE START-----------------------------');
    console.log(response);
    console.log('-----------------------------GET RESPONSE END-----------------------------');
}); */