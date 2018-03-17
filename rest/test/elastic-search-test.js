let ddbIndexer = require('../src/common/ddbEsIndexer');
let search = require('../src/api/search');

let testRecord_bus = {
    "Records": [
      {
        "eventID": "1",
        "eventName": "test event",
        "dynamodb": {
          "ApproximateCreationDateTime": 1510049340,
          "Keys": {
            "bus_id": {
              "S": "b-test-01"
            }
          },
          "NewImage": {
            "bus_hours": [
                {
                    "startTime": "10:00",
                    "endTime": "17:00",
                    "day": -1
                },
                {
                    "startTime": "09:00",
                    "endTime": "13:00",
                    "day": 7
                }
            ],
            "images": [
                "trendy_looks.jpg",
                "image-2.jpg"
            ],
            "website": "wwww.smiledentalnj.com",
            "address": "110 Main Street, Edison, NJ 08817",
            "staff": [
              "b-test-01-s-01",
              "b-test-01-s-02",
              "b-test-01-s-03"
            ],
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
            "holidays": {
                "weekdays": [
                    0,
                    3
                ],
                "dates": [
                    "07-04-2018",
                    "09-04-2018",
                    "11-25-2018"
                ]
            },
            "phone": "7871111211",
            "awards": "NJ Best Dental 2015",
            "bus_time_zone": "America/New_York",
            "statement_notes": "we treat your smile special",
            "specialized_in": "General Dentistry",
            "bus_id": "b-test-01",
            "category": "Health Care",
            "bus_name": "Smile Dental",
            "defaultImage": "trendy_looks.jpg",
            "email": "info@smiledentalnj.com",
            "appointment_instructions": "insurance not required. walk-ins welcome",
            "statement_caption": "Our Mission"
        },
          "SequenceNumber": "96767400000000004568984127",
          "SizeBytes": 457,
          "StreamViewType": "NEW_IMAGE"
        }
      }
    ]
  };

ddbIndexer.esBusinessIndexer(testRecord_bus, null, (response, msg) => {
      console.log(msg);
});



let testRecord_staff = {
  "Records": [
    {
      "eventID": "1",
      "eventName": "test event",
      "dynamodb": {
        "ApproximateCreationDateTime": 1510049340,
        "Keys": {
          "bus_id": {
            "S": "b-test-01"
          }
        },
        "NewImage": {
           "bus_id": "b-test-01",
           "service_time": "30m",
           "staff_id": "b-test-02-s-01",
           "staff_name": "Dr. Sara10",
           "tags": "dentures, internal medicine"
        },
        "SequenceNumber": "96767400000000004568984127",
        "SizeBytes": 457,
        "StreamViewType": "NEW_IMAGE"
      }
    }
  ]
};

/* ddbIndexer.esStaffIndexer(testRecord_staff, null, (response, msg) => {
  console.log(msg);
}); */

let searchObj = {
  "queryStringParameters": { _p: 'null', searchTerm: 'best' }
};


/* search.doSearch(searchObj, null, (error, response) => {
  console.log('-----------------------------search RESPONSE START-----------------------------');
  console.log(response);
  console.log('-----------------------------search RESPONSE END-----------------------------');
});  */


/*  let facetSearchObj = {
  "queryStringParameters": {
    "searchTerm": "best"
  },
  "body" : "{\"key\" : \"keyword_category\", \"values\" : [\"Dental\", \"Beauty Care\"]}"
};

let facetSearchObj2 = {
  "queryStringParameters": {
    "searchTerm": "health",
    "_p" : ""
  },
  "body" : "{\"key\" : \"staff.languages\", \"values\" : [\"english\", \"telugu\"]}"
};

search.doFacetSearch(facetSearchObj2, null, (error, response) => {
  console.log('-----------------------------Facet RESPONSE START-----------------------------');
  console.log(response);
  console.log('-----------------------------Facet RESPONSE END-----------------------------');
});  */