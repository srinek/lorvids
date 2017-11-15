'use strict';
let elasticsearch=require('elasticsearch');
let config = require('config');
console.log("**** ES host *****",  config.get('app.es').host);
var esClient = new elasticsearch.Client( {  
    hosts: [
        config.get('app.es').host
    ]
});
module.exports = esClient;