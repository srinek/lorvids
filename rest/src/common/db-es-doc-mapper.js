var DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.businessDocMapper = (ddbDoc) => {
  let ddbJsDoc =  DynamoDB.Converter.unmarshall(ddbDoc);
  console.log("business doc indexed %j -- ", ddbJsDoc);
  let indexdoc = {};
  setDefaults(indexdoc,true);
  indexdoc.id = ddbJsDoc.bus_id;
  indexdoc.body = ddbJsDoc;
  return indexdoc;
}

var setDefaults = (indexdoc, refresh) => {
  indexdoc.index = "business_docs";
  indexdoc.type = 'business_type';
  if(refresh){
    indexdoc.refresh = true;
  }
}

module.exports.staffDocMapper = (ddbDoc) => {
  //console.log("ddbDoc %j ", ddbDoc);
  let ddbJsDoc =  DynamoDB.Converter.unmarshall(ddbDoc);
  //console.log("staff doc indexed %j -- ", ddbJsDoc);
  let staffIndexdoc = {};
  setDefaults(staffIndexdoc, true);
  
  staffIndexdoc.id = ddbJsDoc.bus_id;
  delete ddbJsDoc.bus_id;
  staffIndexdoc.body = {};
  var staffArr = [ddbJsDoc];
  //staffIndexdoc.body.doc.staff = staffArr;
  staffIndexdoc.body.script = {
    lang : "painless",
    inline : "ctx._source.staff.add(params.newstaff)",
    params : {
         "newstaff" : ddbJsDoc
    }
  };
  //staffIndexdoc.body.params = {"newstaff" : ddbJsDoc};
  console.log("staffIndexer %j ", staffIndexdoc)
  return staffIndexdoc;
}

module.exports.searchDocMapper = (searchTerm) => {
  let searchObj = {};
  setDefaults(searchObj, false);
  searchObj.body = { 
    query : {
      match : { _all : searchTerm }
    }, 
    aggs : {
      categories : {
        terms : {
          field : "keyword_category"
        }
      },
      gender : {
        nested : {
          path : "staff"
        },
        aggs : {
          gender : { 
            terms : { 
              field : "staff.gender" 
            } 
          }
        }
      },
      languages : {
        nested : {
          path : "staff"
        },
        aggs : {
          languages : { 
            terms : { 
              field : "staff.languages" 
            } 
          }
        }
      }
    } 
  };
  console.log("search obj %j ", searchObj);
  return searchObj;
}