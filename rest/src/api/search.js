'use strict';
var es = require('../es/es-sync.js');
var docMapper = require('../common/db-es-doc-mapper.js');
let util = require('../common/util');

module.exports.doSearch = (event, context, callback) => {
    console.log("queryString", event.queryStringParameters);
    const searchTerm = event.queryStringParameters.searchTerm;
    let property = event.queryStringParameters._p;
    let esObj = docMapper.searchDocMapper(searchTerm, property);
    es.esSearch(esObj, (error, result) => {
        if (error) {
            let response = util.error();
            response.body = JSON.stringify(error);
            console.log("error callback ", response);
            callback(null, response);
          } else {
            let response = util.success();
            response.body = JSON.stringify(result);
            console.log("success callback ", response);
            callback(null, response);
          }
    });
}

module.exports.doFacetSearch = (event, context, callback) => {
    const searchTerm = event.queryStringParameters.searchTerm;
    let property = event.queryStringParameters._p;
    console.log("property", property);
    //console.log("body", event.body);
    const facets = JSON.parse(event.body);
    //console.log("facets", facets);
    let esObj = docMapper.facetSearchDocMapper(searchTerm, property, facets);
    es.esSearch(esObj, (error, result) => {
        if (error) {
            let response = util.error();
            response.body = JSON.stringify(error);
            console.log("error callback ", response);
            callback(null, response);
          } else {
            let response = util.success();
            response.body = JSON.stringify(result);
            console.log("success callback ", response);
            callback(null, response);
          }
    });
}