'use strict';
var docMapper = require('./db-es-doc-mapper.js');
var es = require('../es/es-sync.js');

module.exports.esBusinessIndexer = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    event.Records.forEach((record) => {
        console.log(record.eventID);
        //console.log(record.eventName);
        //console.log('DynamoDB Record: %j', record.dynamodb);
        let esObj = docMapper.businessDocMapper(record.dynamodb.NewImage);
        es.esIndex(esObj, (error, response) => { 
            if(error){
                console.log("error-- %j", error);
                callback(null, error);
            }
            else{
                console.log("success-- %j", response);
                callback(null, response);
            }
         });
    });
    
}
