let ses = require('aws-sdk/clients/ses');
let businessService = require('./business-service');
let staffService = require('./staff-service');
let Business = require('../model/business-model');
let Staff = require('../model/staff-model');
let config = require('config');

const emailService = new ses({apiVersion: '2010-12-01', region:"us-east-1"});
const senderEmail = "srinek@gmail.com";//config.get('app.ses.senderEmail');
const lorvid_url = "http://lorvids.s3-website-us-east-1.amazonaws.com";
const image_lot = "https://s3.amazonaws.com/lorvid-devlot";

module.exports.sendConfirmationEmail = (appointmentData, userData) => {
    let business, staffobj;
    businessService.getBusinessById(appointmentData.busId).then( (businessResult) => {
        business = new Business(businessResult);
        return staffService.getStaffByBusIdAndStaffId(appointmentData.busId, appointmentData.staffId);
    }).then( (staffResult) => {
        staffobj = new Staff(staffResult);
        return {"appointment_id" : appointmentData.AppointmentId,"appointment_time" : appointmentData.time};  /// here we got to load the appointment details
    }).then( (appointmentObj) => {
        let emailData = {};
        emailData.toAddresses = [userData.UserEmail];
        emailData.CcAddresses = [];
        emailData.templateData = populateAppointmentConfirmationTemplateData(appointmentData, userData, business, staffobj, appointmentObj);
        emailData.templateName = "ConfirmationTemplate";
        console.log("===============================================================");
        console.log("emailData", emailData);
        console.log("===============================================================");
        sendEmail(emailData);
    });
    
}

module.exports.sendUserVerificationEmail = (hash, userData) => {
    let emailData = {};
    emailData.toAddresses = [userData.UserEmail];
    emailData.CcAddresses = [];
    emailData.templateData = populateUserVerificationTemplateData(hash, userData);
    emailData.templateName = "UserVerificationTemplate";
    console.log("===============================================================");
    console.log("emailData", emailData);
    console.log("===============================================================");
    sendEmail(emailData);
}

let sendEmail = (emailData) => {
    let params = {
        "Source": senderEmail,
        "Template": emailData.templateName,
        "Destination": {
          "ToAddresses":  emailData.toAddresses
        },
        "TemplateData": emailData.templateData
    };
    var sendPromise = emailService.sendTemplatedEmail(params).promise();

    sendPromise.then(
        function(data) {
            console.log("--------- email sent ---------- ", data);
        }
    ).catch(
        function(err) {
            console.error("------------ error sending email ----- ");
            console.error(err, err.stack);
        }
    );
}

let populateAppointmentConfirmationTemplateData = (appointmentData, userData, business, staff, appointment) => {
    let templateData = {};
    templateData.bus_id = business.bus_id;
    templateData.bus_image = `${image_lot}/${business.defaultImage}`;
    templateData.bus_name = business.bus_name;
    templateData.bus_address = business.address;
    templateData.bus_phone = business.phone;
    templateData.appointment_time = appointment.appointment_time;
    templateData.staff_name = staff.staff_name;
    templateData.staff_image = staff.images ? staff.images[0] : "";
    templateData.service = appointmentData.service;
    templateData.user = userData.name;
    templateData.appointments_url = `${lorvid_url}/viewappts/${appointment.appointment_id}`;
    //lorvids variables
    templateData.lorvid_url = lorvid_url;
    templateData.lorvids_logo = `${image_lot}/logo.png`;
    return JSON.stringify(templateData);
}

let populateUserVerificationTemplateData = (hash,userData) => {
    let templateData = {};
    templateData.user = userData.name;
    templateData.verificationEmailLink = `${lorvid_url}/user/activate/${hash}`;
    templateData.lorvid_url = lorvid_url;
    templateData.lorvids_logo = `${image_lot}/logo.png`;
    return JSON.stringify(templateData);
}


/* let sendEmail = (emailData) => {

    // Create sendEmail params 
    var params = {
        Destination: { 
            CcAddresses: emailData.CcAddresses,
            ToAddresses: emailData.toAddresses
        },
        Message: { 
            Body: { 
                Html: {
                    Charset: "UTF-8",
                    Data: emailData.body
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: emailData.subject
            }
        },
        Source: senderEmail,
        ReplyToAddresses: []
    };       

    // Create the promise and SES service object
    var sendPromise = emailService.sendEmail(params).promise();

    sendPromise.then(
        function(data) {
            console.log("--------- email sent ---------- ", data.MessageId);
        }
    ).catch(
        function(err) {
            console.error("------------ error sending email ----- ");
            console.error(err, err.stack);
        }
    );
} */



module.exports.sendTestEmail = () => {
    // Create sendEmail params 
    var params = {
        Destination: { 
            ToAddresses: [ "srinek@gmail.com" ]
        },
        Message: { 
            Body: { 
                Html: {
                    Charset: "UTF-8",
                    Data: "this is test <br> <b>email</b> for user Nanda text"
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "This is non templated email"
            }
        },
        Source: senderEmail,
        ReplyToAddresses: []
    };

     // Create the promise and SES service object
     var sendPromise = emailService.sendEmail(params).promise();

     sendPromise.then(
         function(data) {
             console.log("--------- email sent ---------- ", data.MessageId);
         }
     ).catch(
         function(err) {
             console.error("------------ error sending email ----- ");
             console.error(err, err.stack);
         }
     );
}

module.exports.sendTestTemplateEmail = () => {
    let params = {
        "Source": senderEmail,
        "Template": "ConfirmationTemplate",
        "Destination": {
          "ToAddresses": [ 'srinek@gmail.com' ]
        },
        "TemplateData": populateAppointmentConfirmationTemplateData()
    };
    var sendPromise = emailService.sendTemplatedEmail(params).promise();

    sendPromise.then(
        function(data) {
            console.log("--------- email sent ---------- ", data.MessageId);
        }
    ).catch(
        function(err) {
            console.error("------------ error sending email ----- ");
            console.error(err, err.stack);
        }
    );
}