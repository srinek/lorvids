let ddbIndexer = require('../src/common/ddbEsIndexer');

let testRecord_bus = {
    "Records": [
      {
        "eventID": "1",
        "eventName": "test event",
        "dynamodb": {
          "ApproximateCreationDateTime": 1510049340,
          "Keys": {
            "bus_id": {
              "S": "b-test-es-03"
            }
          },
          "NewImage": {
            "bus_hours": {
              "L": [
                {
                  "M": {
                    "time": {
                      "S": "10AM - 5PM"
                    },
                    "day": {
                      "S": "ALL"
                    }
                  }
                },
                {
                  "M": {
                    "time": {
                      "S": "9AM - 1PM"
                    },
                    "day": {
                      "S": "SAT"
                    }
                  }
                }
              ]
            },
            "address": {
              "S": "110 Second Street, Newyork, NY 08854"
            },
            "holidays": {
              "M": {
                "weekdays": {
                  "L": [
                    {
                      "N": "0"
                    },
                    {
                      "N": "4"
                    }
                  ]
                },
                "dates": {
                  "L": [
                    {
                      "S": "1507825795220"
                    },
                    {
                      "S": "1507825795221"
                    },
                    {
                      "S": "1507825795222"
                    }
                  ]
                }
              }
            },
            "phone": {
              "S": "9890005555"
            },
            "awards": {
              "S": "best dental NJ 2011"
            },
            "bus_time_zone": {
              "S": "EST"
            },
            "statement_notes": {
              "S": "smile with confidence"
            },
            "specialized_in": {
              "S": "dental needs"
            },
            "bus_id": {
              "S": "b-test-es-03"
            },
            "category": {
              "S": "Health Care"
            },
            "bus_name": {
              "S": "Nekkanti Business"
            },
            "appointment_instructions": {
              "S": "insurance or by cash"
            },
            "statement_caption": {
              "S": "Practice Mission"
            }
          },
          "SequenceNumber": "96767400000000004568984127",
          "SizeBytes": 457,
          "StreamViewType": "NEW_IMAGE"
        }
      }
    ]
  };

/* ddbIndexer.esBusinessIndexer(testRecord_bus, null, (response, msg) => {
      console.log(msg);
}); */



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
           "staff_name": "Dr. Sara2",
           "tags": "hair cut, hair wash, nails"
        },
        "SequenceNumber": "96767400000000004568984127",
        "SizeBytes": 457,
        "StreamViewType": "NEW_IMAGE"
      }
    }
  ]
};

ddbIndexer.esStaffIndexer(testRecord_staff, null, (response, msg) => {
  console.log(msg);
});
