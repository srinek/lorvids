var DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.businessDocMapper = (ddbDoc) => {
  let ddbJsDoc =  DynamoDB.Converter.unmarshall(ddbDoc);
  console.log("business doc indexed %j -- ", ddbJsDoc);
  let indexdoc = {};
  setDefaults(indexdoc);
  indexdoc.id = ddbJsDoc.bus_id;
  indexdoc.body = ddbJsDoc;
  return indexdoc;
}

var setDefaults = (indexdoc) => {
  indexdoc.index = "business_docs";
  indexdoc.type = 'business_type';
  indexdoc.refresh = true;
}

module.exports.staffDocMapper = (ddbDoc) => {
  //console.log("ddbDoc %j ", ddbDoc);
  let ddbJsDoc =  DynamoDB.Converter.unmarshall(ddbDoc);
  //console.log("staff doc indexed %j -- ", ddbJsDoc);
  let staffIndexdoc = {};
  setDefaults(staffIndexdoc);
  
  staffIndexdoc.id = ddbJsDoc.bus_id;
  delete ddbJsDoc.bus_id;
  staffIndexdoc.body = {};
  staffIndexdoc.body.doc = {};
  var staffArr = [ddbJsDoc];
  staffIndexdoc.body.doc.staff = staffArr;
  //staffIndexdoc.body.script = "ctx._source.staff += newstaff";
  //staffIndexdoc.body.params = {"newstaff" : ddbJsDoc};
  console.log("staffIndexer %j ", staffIndexdoc)
  return staffIndexdoc;
}