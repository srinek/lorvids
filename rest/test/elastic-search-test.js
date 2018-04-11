let ddbIndexer = require('../src/common/ddbEsIndexer');
let search = require('../src/api/search');

let testRecord_bus = {
    "Records": [
      {
        "eventID": "1",
        "eventName": "test event",
        "dynamodb": {
          "ApproximateCreationDateTime": 1523266140,
          "Keys": {
              "bus_id": {
                  "S": "b-test-60"
              }
          },
          "NewImage": {
              "bus_hours": {
                  "L": [
                      {
                          "M": {
                              "startTime": {
                                  "S": "8:00 AM"
                              },
                              "endTime": {
                                  "S": "5:00 PM"
                              },
                              "day": {
                                  "N": "2"
                              }
                          }
                      },
                      {
                          "M": {
                              "startTime": {
                                  "S": "8:00 AM"
                              },
                              "endTime": {
                                  "S": "5:00 PM"
                              },
                              "day": {
                                  "N": "3"
                              }
                          }
                      },
                      {
                          "M": {
                              "startTime": {
                                  "S": "8:00 AM"
                              },
                              "endTime": {
                                  "S": "5:00 PM"
                              },
                              "day": {
                                  "N": "5"
                              }
                          }
                      },
                      {
                          "M": {
                              "startTime": {
                                  "S": "8:00 AM"
                              },
                              "endTime": {
                                  "S": "5:00 PM"
                              },
                              "day": {
                                  "N": "6"
                              }
                          }
                      },
                      {
                          "M": {
                              "startTime": {
                                  "S": "8:00 AM"
                              },
                              "endTime": {
                                  "S": "1:00 PM"
                              },
                              "day": {
                                  "N": "7"
                              }
                          }
                      },
                      {
                          "M": {
                              "startTime": {
                                  "S": "Closed"
                              },
                              "endTime": {
                                  "S": "Closed"
                              },
                              "day": {
                                  "N": "1"
                              }
                          }
                      },
                      {
                          "M": {
                              "startTime": {
                                  "S": "Closed"
                              },
                              "endTime": {
                                  "S": "Closed"
                              },
                              "day": {
                                  "N": "4"
                              }
                          }
                      }
                  ]
              },
              "images": {
                  "L": [
                      {
                          "S": "5f2f24a2-1523098836225.jpg"
                      },
                      {
                          "S": "f55d38ca-1523098836595.jpg"
                      },
                      {
                          "S": "5d815e0f-1523098836594.jpg"
                      }
                  ]
              },
              "website": {
                  "S": "www.lorvids-web.com"
              },
              "address": {
                  "S": "1024 Waterford Drive"
              },
              "staff": {
                  "L": [
                      {
                          "M": {
                              "staff_name": {
                                  "S": "Dr. Nanda"
                              },
                              "staff_languages": {
                                  "S": "English"
                              },
                              "images": {
                                  "L": []
                              },
                              "bus_hours": {
                                  "L": []
                              },
                              "rating": {
                                  "N": "5"
                              },
                              "personalStatement": {
                                  "S": "Dr.Nanda graduated from Rutgers and has been working as dentist since 10 years"
                              },
                              "practices": {
                                  "L": []
                              },
                              "tags": {
                                  "S": "dentist, root canal"
                              },
                              "staff_phone": {
                                  "S": "6766565656"
                              },
                              "holidays": {
                                  "M": {
                                      "weekdays": {
                                          "L": []
                                      },
                                      "dates": {
                                          "L": []
                                      }
                                  }
                              },
                              "awards": {
                                  "S": "top dentis 2011"
                              },
                              "staff_id": {
                                  "S": "b-test-60-s-8cd1bf11"
                              },
                              "bus_id": {
                                  "S": "b-test-60"
                              },
                              "staff_email": {
                                  "S": "nanda@lorvids-web.com"
                              }
                          }
                      }
                  ]
              },
              "services": {
                  "L": [
                      {
                          "M": {
                              "cost": {
                                  "S": "75"
                              },
                              "name": {
                                  "S": "Dental Cleaning"
                              }
                          }
                      },
                      {
                          "M": {
                              "cost": {
                                  "S": "350"
                              },
                              "name": {
                                  "S": "Root Canal Treatment"
                              }
                          }
                      },
                      {
                          "M": {
                              "cost": {
                                  "S": "400"
                              },
                              "name": {
                                  "S": "dentures"
                              }
                          }
                      },
                      {
                          "M": {
                              "cost": {
                                  "S": "400"
                              },
                              "name": {
                                  "S": "Amalgams"
                              }
                          }
                      }
                  ]
              },
              "holidays": {
                  "M": {
                      "weekdays": {
                          "L": [
                              {
                                  "N": "1"
                              },
                              {
                                  "N": "4"
                              }
                          ]
                      },
                      "dates": {
                          "L": []
                      }
                  }
              },
              "phone": {
                  "S": "7323182848"
              },
              "awards": {
                  "S": "Top Dentist 2015, Top Dentist 2016"
              },
              "bus_time_zone": {
                  "S": "America/new_york"
              },
              "bus_id": {
                  "S": "b-test-60"
              },
              "category": {
                  "M": {
                      "image": {
                          "S": "dentist-pain-borowac-cure-52527.jpeg"
                      },
                      "categoryCode": {
                          "S": "HEALTH"
                      },
                      "categoryName": {
                          "S": "Dentists"
                      }
                  }
              },
              "bus_name": {
                  "S": "Lorvids Test Business"
              },
              "defaultImage": {
                  "S": "5f2f24a2-1523098836225.jpg"
              },
              "email": {
                  "S": "srinek@gmail.com"
              },
              "appointment_instructions": {
                  "S": "insurance required, only dental PPO is accepted."
              }
          },
          "SequenceNumber": "824042000000000004419577653",
          "SizeBytes": 1354,
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