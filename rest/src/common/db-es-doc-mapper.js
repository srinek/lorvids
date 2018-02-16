var DynamoDB = require('aws-sdk/clients/dynamodb');
const elBuilder = require('elastic-builder');

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
  requestBody.query(buildQueryObj(searchTerm, property, facet));
  requestBody.aggs(buildAggObj());
  facetSearchObj.body = requestBody.toJSON();
  console.log("search obj %j ", facetSearchObj.body);
  return facetSearchObj;
}

var buildQueryObj = (searchTerm, property, facet) => {
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