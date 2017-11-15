var esClient = require('./es-connection.js');

module.exports.esIndex = (jsonStr, callback) => {
    esClient.index(jsonStr,
        function (error, response) {
            callback(error, response);
        }
    );
}

module.exports.esUpdate = (jsonStr, callback) => {
   console.log(" update obj ", jsonStr);
   //console.log("esCLient ", esClient);
   esClient.update(jsonStr,
        function (error, response) {
            callback(error, response);
        }
    );
}