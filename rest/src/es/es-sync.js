var esClient = require('./es-connection.js');

module.exports.esIndex = (jsonStr, callback) => {
    esClient.index(jsonStr,
        function (error, response) {
            callback(error, response);
        }
    );
}

module.exports.esUpdate = (jsonStr, callback) => {
   console.log(" es update obj ", jsonStr);
   esClient.update(jsonStr,
        function (error, response) {
            callback(error, response);
        }
    );
}

module.exports.esSearch = (jsonStr, callback) => {
    esClient.search(jsonStr)
    .then(results => {
        console.log("results %j ", results);
        callback(null, results);
      })
      .catch(error => {
        callback(error, null);
      });
}