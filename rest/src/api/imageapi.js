const s3Service = require('../services/s3-service');
let util = require('../common/util');

module.exports.upload = (event, context, callback) => {
    const body = JSON.parse(event.body);
    const id = event.pathParameters.picid;
    const time = new Date();
    const fileName = `${id}-${time.getTime()}`;
    s3Service.uploadFile(body['base64'], fileName)
    .then( (data) => {
        console.log("data ", data);
        let response = util.success();
        response.body = JSON.stringify(data);
        callback(null, response);
    }).catch((error) => {
        console.log("error "+error);
        let response = util.error();
        response.body = JSON.stringify(error);
        callback(null, response);
    });
}

module.exports.delete = (event, context, callback) => {
    const fileName = event.pathParameters.picid;
    s3Service.deleteFile(fileName)
    .then( (data) => {
        console.log("data ", data);
        let response = util.success();
        response.body = JSON.stringify(data);
        callback(null, response);
    }).catch((error) => {
        console.log("error ", error);
        let response = util.error();
        response.body = JSON.stringify(error.message);
        callback(null, response);
    });
}