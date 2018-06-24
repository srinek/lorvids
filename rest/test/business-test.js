let business = require('../src/api/business');

let testGetObj = { "pathParameters" : 
                    {
                        "busId" : "b-test-70",
                    }
                 };
business.get(testGetObj  , 
     null, 
     (error, response) => {
        console.log('-----------------------------GET RESPONSE START-----------------------------');
        console.log(response);
        console.log('-----------------------------GET RESPONSE END-----------------------------');
     }
); 

let testSaveObj = {
    "body" : 
    JSON.stringify({
      "address": "220 Second Street, Piscataway, NJ 08857",
      "appointment_instructions": "insurance required. appointments needed",
      "awards": "NJ Best Dental 2017",
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
      "bus_id": "b-test-05",
      "bus_name": "Rainbow Pediatrics Dental",
      "bus_time_zone": "EST",
      "category": "Health Care",
      "defaultImage": "b-test-02-test-pediatric.png",
      "holidays": {
        "dates": [
          "07-04-2018",
          "09-04-2018",
          "11-25-2018"
        ],
        "weekdays": [
          0,
          4
        ]
      },
      "images": [
        "b-test-02-test-pediatric.png"
      ],
      "phone": "9890001111",
      "services": [
        {
          "cost": "100",
          "name": "Dental Cleaning"
        },
        {
          "cost": "200",
          "name": "Root Canal Treatment"
        },
        {
          "cost": "50",
          "name": "Cavities"
        },
        {
          "cost": "25",
          "name": "Teeth Pain"
        }
      ],
      "specialized_in": "pediatric needs",
      "staff": [],
      "statement_caption": "Practice Mission",
      "statement_notes": "kids are gods"
    })
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
      "bus_name": "test business 222",
      "address": "116 Main Street, SouthPlainfield, NJ, 08854",
      "email": "bus11@bus.com",
      "phone": "6787876767",
      "website": "www.some11.com"
  })
};


/* {
  "body": {
    "bus_id": "b-test-03",
    "bus_name": "Theory Salon",
    "address": "220 Second Street, Newark, NJ 08854",
    "phone": "9890001111",
    "category": "Beauty Care",
    "statement_caption": "Practice Mission",
    "statement_notes": "love yourself",
    "specialized_in": "Beauty needs",
    "appointment_instructions": "Please be on time",
    "awards": "best beauty salon",
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
    },
    "staff": [
      {
        "staff_id": "b-test-02-s-01",
        "staff_name": "Sara",
        "tags": "hair cut, hair wash, nails",
        "service_time": "30m"
      },
      {
        "staff_id": "b-test-02-s-01",
        "staff_name": "Nanda",
        "tags": "hair cut, hair wash, nails",
        "service_time": "30m"
      }
    ]
  }
} */

//console.log("in test "+JSON.stringify(testSaveObj2) +"end");
/* business.save(testSaveObj, 
    null, 
    (error, response) => {
        console.log('-----------------------------SAVE RESPONSE START-----------------------------');
        console.log(response);
        console.log('-----------------------------SAVE RESPONSE END-----------------------------');
    }
); */

let testExpenseObj = { "pathParameters" : 
                    {
                        "busId" : "b-test-01",
                    },
                    "queryStringParameters" : 
                    {
                        "loadStaff": "false"
                    }
                 };

// business.getBusinessExpenses(testExpenseObj  , 
//   null, 
//   (error, response) => {

//     console.log('-----------------------------GET Expense RESPONSE START-----------------------------');
//     console.log(response);
//     console.log('-----------------------------GET RESPONSE END-----------------------------');
//   }
// );



let testUpdateObj = {
  "pathParameters" : 
    {
        "busId" : "b-test-02",
    },
  "body" : 
  JSON.stringify({
    "address": "220 Second Street, Piscataway, NJ 08857",
    "appointment_instructions": "insurance required. appointments needed",
    "awards": "NJ Best Dental 2017",
    "bus_hours": [
      {
        "day": -1,
        "endTime": "17:00",
        "startTime": "10:00"
      },
      {
        "day": 7,
        "endTime": "13:00",
        "startTime": "09:00"
      }
    ],
    "bus_id": "b-test-02",
    "bus_name": "Rainbow Pediatrics Dental",
    "bus_time_zone": "EST",
    "category": "Health Care",
    "defaultImage": "b-test-02-test-pediatric.png",
    "holidays": {
      "dates": [
        "07-04-2018",
        "09-04-2018",
        "11-25-2018"
      ],
      "weekdays": [
        0,
        4
      ]
    },
    "images": [
      "b-test-02-test-pediatric.png"
    ],
    "phone": "9890001111",
    "services": [
      {
        "cost": "100",
        "name": "Dental Cleaning"
      },
      {
        "cost": "200",
        "name": "Root Canal Treatment"
      },
      {
        "cost": "50",
        "name": "Cavities"
      },
      {
        "cost": "25",
        "name": "Teeth Pain"
      }
    ],
    "specialized_in": "pediatric needs",
    "staff": [],
    "statement_caption": "Practice Mission",
    "statement_notes": "kids are gods"
  })
};

/* business.update(testUpdateObj, 
  null, 
  (error, response) => {
      console.log('-----------------------------SAVE RESPONSE START-----------------------------');
      console.log(response);
      console.log('-----------------------------SAVE RESPONSE END-----------------------------');
  }
); */