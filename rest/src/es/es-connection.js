let elasticsearch=require('elasticsearch');
var esClient = new elasticsearch.Client( {  
    hosts: [
        'https://search-epokly-dev-v1-akgmth4zxz676zcoosjtnrkdfi.us-east-1.es.amazonaws.com/'
    ]
});
module.exports = esClient;