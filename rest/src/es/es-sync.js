var esClient = require('./es-connection.js');

module.exports.esIndex = (jsonStr, callback) => {
    esClient.index(jsonStr,
        function (error, response) {
            callback(error, response);
        }
    );
}