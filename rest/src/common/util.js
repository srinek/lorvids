module.exports.sanitizeDBValue = (key, value) => {
    if(value) return value;
}

module.exports.error = () => {
    let response = {
            statusCode: 500,
            headers : {"Access-Control-Allow-Origin" : "*"},
            body: "",
        };
    return response;
}

module.exports.success = () => {
    let response = {
        statusCode: 200,
        headers : {"Access-Control-Allow-Origin" : "*"},
        body: "",
      };
    return response;
}