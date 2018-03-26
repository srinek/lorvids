let imageapi = require('../src/api/imageapi');

let image = {
  "body" : '{ "base64" : "some string 111"}'
};

imageapi.upload(
  image, 
   null, 
   (error, response) => {
    console.log('-----------------------------SAVE RESPONSE START-----------------------------');
    console.log(response);
    console.log('-----------------------------SAVE RESPONSE END-----------------------------');
  }
); 