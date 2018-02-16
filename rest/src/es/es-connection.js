'use strict';
let elasticsearch=require('elasticsearch');
let config = require('config');
//console.log("**** ES host *****",  config.get('app.es').host);
var esClient = new elasticsearch.Client( {  
    log : "debug",
    hosts: [
        //config.get('app.es').host
        "https://search-epokly-dev-v2-gtoyrqtpxtzscmdewgodxjzhtu.us-east-1.es.amazonaws.com"
    ]
});
module.exports = esClient;