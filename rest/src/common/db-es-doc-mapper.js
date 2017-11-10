var DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.businessDocMapper = (ddbDoc) => {
  let ddbJsDoc =  DynamoDB.Converter.unmarshall(ddbDoc);
  console.log("business doc indexed %j -- ", ddbJsDoc);
  let indexdoc = {};
  indexdoc.index = "business_docs";
  indexdoc.type = 'business_type';
  indexdoc.id = ddbJsDoc.bus_id;
  indexdoc.refresh = true;
  indexdoc.body = ddbJsDoc;
  return indexdoc;
}