let ses = require('aws-sdk/clients/ses');
let businessService = require('./business-service');
let staffService = require('./staff-service');
let Business = require('../model/business-model');
let Staff = require('../model/staff-model');
let config = require('config');

const emailService = new ses({apiVersion: '2010-12-01', region:"us-east-1"});
const senderEmail = "srinek@gmail.com";//config.get('app.ses.senderEmail');


module.exports.sendConfirmationEmail = (appointmentData, userData) => {
    let business, staffobj;
    businessService.getBusinessById(appointmentData.busId).then( (businessResult) => {
        business = new Business(businessResult);
        return staffService.getStaffByBusIdAndStaffId(appointmentData.busId, appointmentData.staffId);
    }).then( (staffResult) => {
        staffobj = new Staff(staffResult);
        return {"appointment_time" : "8:00 PM, Monday, Jan 2018"};  /// here we got to load the appointment details
    }).then( (appointmentObj) => {
        let emailData = {};
        emailData.toAddresses = [userData.UserEmail];
        emailData.CcAddresses = [];
        emailData.templateData = populateTemplateData(appointmentData, userData, business, staffobj, appointmentObj);
        emailData.templateName = "ConfirmationTemplate";
        console.log("===============================================================");
        console.log("emailData", emailData);
        console.log("===============================================================");
        sendEmail(emailData);
    });
    
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
            console.log("--------- email sent ---------- ", data.MessageId);
        }
    ).catch(
        function(err) {
            console.error("------------ error sending email ----- ");
            console.error(err, err.stack);
        }
    );
}

let populateTemplateData = (appointmentData, userData, business, staff, appointment) => {
    let templateData = {};
    templateData.bus_id = business.bus_id;
    templateData.bus_image = "https://s3.amazonaws.com/lorvid-devlot/b-test-01-1516982181394.jpg";
    templateData.bus_name = business.bus_name;
    templateData.bus_address = business.address;
    templateData.bus_phone = business.phone;
    templateData.appointment_time = appointment.appointment_time;
    templateData.staff_name = staff.staff_name;
    templateData.service = appointmentData.service;
    templateData.user = userData.name;
    templateData.appointments_url = "";
    //lorvids variables
    templateData.lorvid_url = "http://lorvids.s3-website-us-east-1.amazonaws.com/";
    templateData.lorvids_logo = "https://s3.amazonaws.com/lorvid-devlot/logo.png";
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
        "TemplateData": populateTemplateData()
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


module.exports.createTemplate = () => {
    let templateData = {
         "Template": {
             "TemplateName": "ConfirmationTemplate",
             "SubjectPart": "Appointment Confirmation from {{bus_name}}",
             "TextPart": "Appointment is confirmed from {{bus_name}}",
             "HtmlPart": `<!doctype html>
             <html>
             <head>
             <meta charset="utf-8">
             <title></title>
             </head>
             <body style="font-family:Gotham, 'Helvetica Neue', Helvetica, Arial, sans-serif; margin:0; padding:0; color:#333333;">
             
             <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid black; background-color: #e5faec">
                 <tbody>
                     <tr>
                         <td style="padding:40px 0;">
                             <!-- begin main block -->
                             <table cellpadding="0" cellspacing="0" width="608" border="0" align="center">
                                 <tbody>
                                     <tr>
                                         <td>
                                             <a href="{{lorvid_url}}/bushome/{{bus_id}}" style="display:block; width:407px; height:100px; margin:0 auto 30px;">
                                                 <img src="{{lorvids_logo}}" width="407" height="100" alt="" style="display:block; border:0; margin:0;">
                                             </a>
                                             <p style="margin:0 0 36px; text-align:center; font-size:14px; line-height:20px; text-transform:uppercase; color:#626658;">
                                                 {{bus_name}} thanks you.
                                             </p>
                                             <!-- begin wrapper -->
                                             <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                 <tbody>
                                                     <tr>
                                                         <td colspan="3" rowspan="3" bgcolor="#FFFFFF" style="padding:0 0 30px;">
                                                             <!-- begin content -->
                                                             <img src="{{bus_image}}" width="600" height="400" alt="{{bus_name}}" style="display:block; border:0; margin:0 0 44px; background:#eeeeee;">
                                                             <p style="margin:0 30px 33px;; text-align:center; text-transform:uppercase; font-size:24px; line-height:30px; font-weight:bold; color:#484a42;">
                                                                 {{bus_name}}
                                                             </p>
                                                             <!-- begin articles -->
                                                             <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                                 <tbody>
                                                                     <tr valign="top">
                                                                         <td width="30"><p style="margin:0; font-size:1px; line-height:1px;">&nbsp;</p></td>
                                                                         <td>
                                                                             <p style="font-size:14px; line-height:22px; font-weight:bold; color:#333333; margin:0 0 5px;">
                                                                             {{bus_address}} <br/> Phone: {{bus_phone}} </p>
             
                                                                             <p style="margin:0 0 35px; font-size:12px; line-height:18px; color:#333333;"> </p>
                                                                         </td>
                                                                         <td width="30"><p style="margin:0; font-size:1px; line-height:1px;">&nbsp;</p></td>
                                                                         <td>
                                                                             
                                                                             <p style="font-size:14px; line-height:22px; font-weight:bold; color:#333333; margin:0 0 5px;"></p>
                                                                             <p style="margin:0 0 35px; font-size:12px; line-height:18px; color:#333333;">{{appointment_time}}
                                                                             <br/>{{staff_name}} <br/>{{service}}</p>
                                                                         </td>
                                                                         <td width="30"><p style="margin:0; font-size:1px; line-height:1px;">&nbsp;</p></td>
                                                                     </tr>
                                                                     <tr valign="top">
                                                                         <td width="30"><p style="margin:0; font-size:1px; line-height:1px;">&nbsp;</p></td>
                                                                         <td colspan="3">
                                                                             <p style="font-size:14px; line-height:22px; font-weight:bold; color:#333333; margin:0 0 5px;">Hello {{user}}</p>
                                                                             <p style="margin:0 0 35px; font-size:12px; line-height:18px; color:#333333;">
                                                                             Thank you for scheduling. Looking forward to your visit. 
             <br/>
             <a href="{{appointments_url}}" style="color:#398ad0; text-decoration:none; font-weight: bolder;">Click Here</a> to view your appointments, reschedule, and update your profile.
             <br/><br/>
             Thank You, <br/>
             {{bus_name}} </p>
                                                                         </td>
                                                                         <td width="30"><p style="margin:0; font-size:1px; line-height:1px;">&nbsp;</p></td>
                                                                     </tr>
                                                                 </tbody>
                                                             </table>
                                                             <!-- /end articles -->
                                                             <p style="margin:0; border-top:2px solid #e5e5e5; font-size:5px; line-height:5px; margin:0 30px 29px;">&nbsp;</p>
                                                             <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                                 <tbody>
                                                                     <tr valign="top">
                                                                         <td width="30"><p style="margin:0; font-size:1px; line-height:1px;">&nbsp;</p></td>
                                                                         <td>
                                                                             <p style="margin:0 0 4px; font-weight:bold; color:#333333; font-size:14px; line-height:22px;">Lorvids, Inc.</p>
                                                                             <p style="margin:0; color:#333333; font-size:11px; line-height:18px;">
                                                                                 41 Reading Rd, Edison NJ 08817<br>
                                                                                 Help &amp; Support Center: +1 732 629 1900<br>
                                                                                 Website: <a href="//lorvids.com/" style="color:#6d7e44; text-decoration:none; font-weight:bold;">www.lorvids.com</a>
                                                                             </p>
                                                                         </td>
                                                                         <td width="30"><p style="margin:0; font-size:1px; line-height:1px;">&nbsp;</p></td>
                                                                         <td width="120">
                                                                             <a href="https://www.facebook.com/lorvids" style="float:left; width:24px; height:24px; margin:6px 8px 10px 0;">
                                                                                 <img src="images/facebook.png" width="24" height="24" alt="facebook" style="display:block; margin:0; border:0; background:#eeeeee;">
                                                                             </a>
                                                                             <a href="https://twitter.com/lorvids" style="float:left; width:24px; height:24px; margin:6px 8px 10px 0;">
                                                                                 <img src="images/twitter.png" width="24" height="24" alt="twitter" style="display:block; margin:0; border:0; background:#eeeeee;">
                                                                             </a>
                                                                             <p style="margin:0; font-weight:bold; clear:both; font-size:12px; line-height:22px;">
                                                                                 <a href="//lorvids.com/" style="color:#6d7e44; text-decoration:none;">Visit website</a><br>
                                                                                 <a href="//lorvids.com/" style="color:#6d7e44; text-decoration:none;">Mobile version</a>
                                                                             </p>
                                                                         </td>
                                                                         <td width="30"><p style="margin:0; font-size:1px; line-height:1px;">&nbsp;</p></td>
                                                                     </tr>
                                                                 </tbody>
                                                             </table>
                                                             <!-- end content --> 
                                                         </td>
                                                     </tr>
                                                     
                                                     
                                                     
                                                 </tbody>
                                             </table>
                                             <!-- end wrapper-->
                                             <p style="margin:0; padding:34px 0 0; text-align:center; font-size:11px; line-height:13px; color:#333333;">
                                                 Don‘t want to recieve further emails? You can unsibscribe <a href="//pixelbuddha.net/" style="color:#333333; text-decoration:underline;">here</a>
                                             </p>
                                         </td>
                                     </tr>
                                 </tbody>
                             </table>
                             <!-- end main block -->
                         </td>
                     </tr>
                 </tbody>
             </table>
             </body>
             </html>`
         }
     };
 
    let emailTemplatePromise = emailService.updateTemplate(templateData).promise();
    emailTemplatePromise.then( (data) => {
     console.log("template Create ", data);
    }).catch( (err) => {
         console.error("------------ error sending email ----- ");
         console.error(err, err.stack);
    });
 }