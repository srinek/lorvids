var crypto = require('crypto');

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

module.exports.sanitizeResponse = (inValue) => {
   delete inValue.TableName;
   return inValue;
}   

module.exports.success = () => {
    let response = {
        statusCode: 200,
        headers : {"Access-Control-Allow-Origin" : "*"},
        body: "",
      };
    return response;
}

module.exports.randomValueHex = (len) => {
    if(!len){
        len = 8;
    }
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}