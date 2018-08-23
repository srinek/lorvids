let ses = require('aws-sdk/clients/ses');
const emailService = new ses({apiVersion: '2010-12-01', region:"us-east-1"});

module.exports.createAppointmentConfirmationTemplate = () => {
    let templateData = {
         "Template": {
             "TemplateName": "ConfirmationTemplate",
             "SubjectPart": "Appointment Confirmation from {{bus_name}}",
             "TextPart": "Appointment is confirmed from {{bus_name}}",
             "HtmlPart": `<div style="width:500px;margin:0 auto;background: #f8f8f8;padding-top:10px;">
             <div align="center" style="border-bottom:1px solid #f1f1f1;padding-top:10px;padding-bottom:20px;">
                 <a href="{{lorvid_url}}/bushome/{{bus_id}}"
                     <img src="{{lorvids_logo}}" width="185" style="text-align:center;">
                 </a>
             </div>
             <div style="background:#46A8D7;padding:4px;">
                 <p style="text-align:center;font-weight:bold;color:white;font-size:15px;">
                     APPOINTMENT CONFIRMATION
                 </p>
             </div>
         
         
             <div style="padding-left:10px;">
                 <p style="margin-bottom: 4px;font-size:20px;color: #86B817;"><b>Confirmed Appointment</b></p>
                 <p style="font-size:20px;margin-top:2px;margin-bottom: 0px"><b>{{appointment_time}}</b></p>
                 <p style="font-size:10px;margin-top:2px;">{{bus_name}}</p>
             </div>
             
             
             <div style="padding-bottom:10px;padding-top:10px;border-top:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1;">
                 <div style="padding:10px;">
                     <div style="vertical-align: middle;display: table-cell;">
                         <img src="{{staff_image}}" width="85" height="85">
                     </div>
                     <div style="display:inline;display: table-cell;">
                         <div style="padding-left:10px;">
                             <span>Hello {{user}}, your appointment has been confimed by {{bus_name}}.Thank you for scheduling. Looking forward to your visit.</span>
                         </div>
                         <div style="display:inline;vertical-align:middle;display: table-cell;text-align:right;">
                             <div style="padding-left:10px; padding-top:20px">
                                 <a href="{{appointments_url}}" target="new" 
                                 style="background:#0064d3;padding:5px;color:white;text-decoration:none;border-radius: 4px;text-transform: uppercase;">
                                     Change or Cancel Appointment
                                 </a>
                                 <!-- <a href="{{appointments_url}}" target="new" 
                                 style="background:#0064d3;padding:5px;color:white;text-decoration:none;border-radius: 4px;text-transform: uppercase;">
                                     Cancel Appointment
                                 </a> -->
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         
             <div style="padding-bottom:10px;padding-top:10px;border-top:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1;">
                     <div style="padding:10px;">
                             <div style="vertical-align: middle;display: table-cell;width:40%;">
                                     <strong style="color: #f4ae01;font-size: 20px;">DETAILS:</strong>
                                     <div style="font-size:16px;">
                                         <p>{{appointment_time}}</p>
                                         <p>{{staff_name}}</p>
                                         <p>{{bus_address}}</p>
                                         <p>{{bus_phone}}</p>
                                     </div>
                             </div>
                             <div style="display:inline;vertical-align:middle;display: table-cell;text-align:right;">
                                 <div style="padding-left:10px;">
                                         <a href="https://www.google.com/maps/place/1041+NJ-18,+East+Brunswick,+NJ+08816,+USA/@40.4136612,-74.375982,15z/data=!4m5!3m4!1s0x89c3cf08e7f31a1b:0x7d2e11dc377dcd9e!8m2!3d40.4167264!4d-74.3727678" target="new" style="background:#e33238;padding:10px;color:white;text-decoration:none;border-radius: 4px;text-transform: uppercase;">Directions &#9656;</a>
                                 </div>
                             </div>
                     </div>
                 </div>
             <div style="background:#46A8D7;color:white;font-size:15px;padding:5px;">
                     <p style="text-align:center;">
                             © 2018 Lorvids.  All rights reserved.
                     </p>
                     <p style="text-align:center;">
                         Please do not reply directly to this email. It was sent from an unattended mailbox.For correspondence please use <a href="" style="text-decoration:none;font-weight: bold;color:white;">webmaster@lorvids.com</a>
                     </p>
                     
                     <!-- <p style="text-align:center;">
                         <a href="" style="text-decoration:none;font-weight: bold;color:white;">Unsubscribe</a> | <a href="" style="text-decoration:none;font-weight: bold;color:white;">Visit website</a> | <a href="" style="text-decoration:none;font-weight: bold;color:white;">Privacy policy</a>
                     </p> -->
             </div>
             
         </div>`
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

module.exports.createUserVerificationTemplate = () => {
    let templateData = {
         "Template": {
             "TemplateName": "UserVerificationTemplate",
             "SubjectPart": "Action required: Activate your Lorvids account now",
             "TextPart": "Don't miss out! Verify your email to access everything Lorivds has to offer.",
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
                                             <a href="{{lorvid_url}}" style="display:block; width:407px; height:100px; margin:0 auto 30px;">
                                                 <img src="{{lorvids_logo}}" width="407" height="100" alt="" style="display:block; border:0; margin:0;">
                                             </a>
                                             <p style="margin:0; border-top:2px solid #e5e5e5; font-size:5px; line-height:5px; margin:0 30px 29px;">&nbsp;</p>
                                             <table>
                                                 <tbody>
                                                     <tr>
                                                         <td>
                                                             Thanks for booking your appointment with Lorvids. You must follow this link to activate your account. <br><br>
                                                         </td>
                                                     </tr>
                                                     <tr>
                                                         <td>
                                                             <a href="{{verificationEmailLink}}">{{verificationEmailLink}}</a> <br><br>
                                                         </td>
                                                     </tr>
                                                     <tr>
                                                         <td>
                                                             Have fun, and don't hesitate to contact us if you have questions. <br><br>
                                                         </td>
                                                     </tr>
                                                 </tbody>
                                             </table>
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