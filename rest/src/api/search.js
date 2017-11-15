'use strict';
var es = require('../es/es-sync.js');
var docMapper = require('../common/db-es-doc-mapper.js');
let util = require('../common/util');

module.exports.doSearch = (event, context, callback) => {
    const searchTerm = event.queryStringParameters.searchTerm;
    let esObj = docMapper.searchDocMapper(searchTerm);
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