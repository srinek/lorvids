let S3 = require('aws-sdk/clients/s3');
const fileType = require('file-type');
let config = require('config');

const s3Obj = new S3({apiVersion: '2006-03-01'});

const imageTypes = config.get('app.s3.allowedFileTypes');
const maxSize = config.get('app.s3.allowedFileSize');
const bucketName = config.get('app.s3.bucketname');

module.exports.uploadFile = function(fileCotent, filename){

    const fileBuffer = new Buffer(fileCotent, 'base64');
    const fileTypeInfo = fileType(fileBuffer);
    return new Promise((resolve, reject) => {
        if (fileBuffer.length > maxSize) {
            reject(` file is too large. Allowed size ${maxSize}`);
        }
        else if(!imageTypes.includes(fileTypeInfo.mime)){
            reject(` file type is not allowed. Allowed formats are ${imageTypes.join()}`);
        }
        else{
            const lclFileName = `${filename}.${fileTypeInfo.ext}`;
            const params = {
                Body: fileBuffer,
                ACL : 'public-read',
                Key: lclFileName,
                Bucket: bucketName,
                ContentEncoding: 'base64',
                ContentType: fileTypeInfo.mime
            };
            s3Obj.putObject(params, (err, data) => {
            if (err){
                reject(err);
            } 
            else{
                resolve(`${lclFileName}`);
                console.log("s3 upload success". data);
            }
            
        });
        }
    });
}

module.exports.deleteFile = (filename) => {
    return new Promise( (resolve, reject) => {
        var params = {
            Bucket: bucketName, 
            Key: filename
        };
        s3Obj.deleteObject(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                reject(err);
            } 
            else{
                console.log(data);
                resolve(data);
            }
          });
    });
}