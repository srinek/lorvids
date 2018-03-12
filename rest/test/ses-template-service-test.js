let emailTemplateService = require('../src/services/ses-template-service');

//emailTemplateService.createUserVerificationTemplateTemplate();

//emailTemplateService.createUserVerificationTemplate();



const crypto = require('crypto');

const data = 'srinek@gmail.com';
const hash = crypto.createHash('md5').update(data).digest("hex");

/* const hash = crypto.createHmac('sha256', data)
                   .update('I love cupcakes')
                   .digest('hex'); */
console.log(hash);