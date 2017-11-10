'use strict';
let elasticsearch=require('elasticsearch');
let config = require('config');
var esClient = new elasticsearch.Client( {  
    hosts: [
        config.get('app.es').host
    ]
});
module.exports = esClient;