var DynamoDB = require('aws-sdk/clients/dynamodb');
const elBuilder = require('elastic-builder');

module.exports.appointmentDocMapper = (ddbDoc) => {
  let ddbJsDoc =  DynamoDB.Converter.unmarshall(ddbDoc);
  console.log("appointment doc indexed %j -- ", ddbJsDoc);
  let indexdoc = {};
  setAppoinmentIndexType(indexdoc,true);
  indexdoc.id = ddbJsDoc.AppointmentId;
  indexdoc.body = ddbToESAppointmentDoc(ddbJsDoc);
  return indexdoc;
}

var ddbToESAppointmentDoc = (ddbDoc) => {

  var esObj = {};
  var fieldsToCopy = ["checkin","checkout","cost","location","notes","service","status","time"];
  // ddbColumnName:ESAttributeName
  var fieldsToMap = {"AppointmentId" : "appointment_id", "busId":"bus_id", "staffId":"staff_id", "userEmail":"user_email",
                      "creationDate" : "creation_date", "createdBy":"created_by", "updateDate":"update_date",
                      "updatedBy":"updated_by" }

  fieldsToCopy.forEach(function(element){
    esObj[element] = ddbDoc[element]; 
  });

  for (var key in fieldsToMap) {
    if (ddbDoc.hasOwnProperty(key)) {
      esObj[fieldsToMap[key]] = ddbDoc[key]; 
    }
  }

  return esObj; 
}

var setAppoinmentIndexType = (indexdoc, refresh) => {
  indexdoc.index = "business_docs";
  indexdoc.type = 'appointment_info';
  if(refresh){
    indexdoc.refresh = true;
  }
}

let mapToEsStaffObjFromDdbBusObj = (ddbBusObj) => {
  let esStaffObj = [];
  let ddbStaffIds = ddbBusObj.staff;
  if(ddbStaffIds){
    ddbStaffIds.forEach( (eachStaffId) => {
      esStaffObj.push({"staff_id" : eachStaffId});
    });
  }
  return esStaffObj;
}

let mapESCategory = (ddbDoc) => {
    return ddbDoc.category.categoryCode;
}

module.exports.businessDocMapper = (ddbDoc) => {
  let ddbJsDoc =  DynamoDB.Converter.unmarshall(ddbDoc);
  ddbJsDoc.category = mapESCategory(ddbDoc);
  ddbJsDoc.staff = mapToEsStaffObjFromDdbBusObj(ddbJsDoc);
  console.log("business doc indexed %j -- ", ddbJsDoc);
  let indexdoc = {};
  setDefaults(indexdoc,true);
  indexdoc.id = ddbJsDoc.bus_id;
  indexdoc.body = ddbJsDoc;
  return indexdoc;
}

var setDefaults = (indexdoc, refresh) => {
  indexdoc.index = "business_docs";
  indexdoc.type = 'business_info';
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

module.exports.searchDocMapper = (searchTerm, property) => {
  const matchObj = getMatchObj(searchTerm, property);
  let searchObj = {};
  setDefaults(searchObj, false);
  searchObj.body = { 
    query : {
      match : matchObj
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

var getMatchObj = (searchTerm, property) => {
  if(property === 'b'){
    return { "category" : searchTerm } ;
  }
  return { "_all" : searchTerm } ;
}

var getProperty = (searchTerm, property) => {
  if(!property){
    return "_all";
  }
  if(property === 'b'){
    return "category";
  }
}

module.exports.facetSearchDocMapper = (searchTerm, property, facet) => {
  let facetSearchObj = {};
  setDefaults(facetSearchObj, false);
  const requestBody = elBuilder.requestBodySearch();
  console.log("property new ", property);
  requestBody.query(buildSearchQueryObj(searchTerm, property, facet));
  requestBody.aggs(buildAggObj());
  facetSearchObj.body = requestBody.toJSON();
  console.log("search obj %j ", facetSearchObj.body);
  return facetSearchObj;
}

var buildSearchQueryObj = (searchTerm, property, facet) => {
  var queryObj = elBuilder.boolQuery()
  .must(elBuilder.matchQuery(getProperty(searchTerm, property), searchTerm));
  if(facet.key === "staff.languages" || facet.key === "staff.gender"){ // TODO : fix this when facet key is fixed in UI
    queryObj.filter(elBuilder.nestedQuery(buildTermsQueries(facet), "staff"));
  }
  else{
    queryObj.filter(buildTermsQueries(facet));
  }
  return queryObj;
}
/**
 * returns a max. of 1000 records
 * @param {} searchTerms 
 * @param {*} rangeTerms 
 */
module.exports.findBookedAppointments = (searchTerms, rangeTerms) => {
  let appointmentSearchObj = {};
  setAppoinmentIndexType(appointmentSearchObj, false);
  const requestBody = elBuilder.requestBodySearch();
  requestBody.query(buildAppointmentQueryObj(searchTerms, rangeTerms));
  requestBody.from(0);
  requestBody.size(1000);
  appointmentSearchObj.body = requestBody.toJSON();
  console.log("Appointment search query:", appointmentSearchObj.body);
  return appointmentSearchObj;
}

/**
 * 
 * searchTerms = [{field:"bus_id",value:"b-test-01"}]
 * rangeTerms =  [{field:"creation_date", from:{operator:"gte", value:"2018", format?:""}, 
 *                    to:{operator:"lt", value:"2019", format?:"yyyy"}];
 * 
 */
var buildAppointmentQueryObj = (searchTerms, rangeTerms) => {
  var queryObj = elBuilder.boolQuery();
  // queryObj.from(0);
  // queryObj.size(1000);

  if (searchTerms) {
    searchTerms.forEach( function (searchTerm)
    {
      queryObj.must(elBuilder.termQuery(searchTerm.field, searchTerm.value));
    });
  }
  
  if (rangeTerms) {
    rangeTerms.forEach( function (rangeTerm)
    {
      var rangeQueryObj = elBuilder.rangeQuery(rangeTerm.field);
      rangeQueryObj[rangeTerm.from.operator](rangeTerm.from.value)
      if (rangeTerm.from.format) {
        rangeQueryObj.format(rangeTerm.from.format); 
      }
      if (rangeTerm.to) {
        rangeQueryObj[rangeTerm.to.operator](rangeTerm.to.value);
        if (rangeTerm.to.format) {
          rangeQueryObj.format(rangeTerm.to.format); 
        }
      }
      queryObj.must(rangeQueryObj);
    });
  } 
  return queryObj;
}

var buildAggObj = () => {
  var aggs = [];
  aggs.push(buildTermsAggregation("categories", "keyword_category"));
  aggs.push(elBuilder.nestedAggregation("languages", "staff").agg(buildTermsAggregation("languages","staff.languages")));
  aggs.push(elBuilder.nestedAggregation("gender", "staff").agg(buildTermsAggregation("gender","staff.gender")));
  return aggs;
}

var buildTermsAggregation = (name, field) => {
  return elBuilder.termsAggregation(name, field);
}
var buildTermsQueries = (facet) => {
   return elBuilder.termsQuery(facet.key , facet.values);
}