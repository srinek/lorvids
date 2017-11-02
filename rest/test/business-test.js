let business = require('../src/api/business');

let testGetObj = { "pathParameters" : 
                    {
                        "busId" : "b-test-01"
                    }   
                 };

/* business.get(testGetObj  , 
     null, 
     (error, response) => {
        console.log('-----------------------------GET RESPONSE START-----------------------------');
        console.log(response);
        console.log('-----------------------------GET RESPONSE END-----------------------------');
     }
); */

let testSaveObj = {
    "body" : 
    {
        "bus_id": "b-test-05",
        "bus_name": "Nanda Test Business",
        "address": "111 Second Street, Newyork, NY 08854",
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
  };

let testSaveObj2 = 
{"body" : 
  JSON.stringify({
      "staff": [],
      "bus_time_zone": "America/new_york",
      "bus_hours": {},
      "holidays": {},
      "statement_caption": "",
      "statement_notes": "",
      "specialized_in": "",
      "awards": "",
      "appointment_instructions": [],
      "bus_id": "b-test-07",
      "bus_name": "test business from UI",
      "address": "115 Main Street, SouthPlainfield, NJ, 08854",
      "email": "bus@bus.com",
      "phone": "6787876767",
      "website": "www.some.com"
  })
};
//console.log("in test "+JSON.stringify(testSaveObj2) +"end");
business.save(testSaveObj2, 
    null, 
    (error, response) => {
        console.log('-----------------------------SAVE RESPONSE START-----------------------------');
        console.log(response);
        console.log('-----------------------------SAVE RESPONSE END-----------------------------');
    }
);