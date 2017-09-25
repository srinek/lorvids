var BusinessGet = require('./getBusiness');
var BusinessSave = require('./saveBusiness');
// BusinessSave.saveBusiness(
//     {   
//         Item: {
//             'BusId' : {S: '004'},
//             'Bus_Name' : {S: 'Sime Dental'},
//             'Address' : {S: '10 Main Street, Metuchen, NJ 08817'},
//             'Phone' : {S : '5653432322'},
//             'Category' : {S : 'Health Services'},
//             'Statement Caption' : { S : 'Practice Statement'},
//             'Statement Notes' : { S : 'Provide best dental experience'},
//             'SpecializedIn' : {S : 'Dental Procedure'},
//             'AppointmentInstructions' : { S : 'comma, seperated, instructions'},
//             'Awards' : {S : ' NJ Best Dental'},
//           }
//     }, 
//     null, 
//     (error, response) => {
//         console.log('-----------------------------SAVE RESPONSE START-----------------------------');
//         console.log(response);
//         console.log('-----------------------------SAVE RESPONSE END-----------------------------');
//     }
// );

BusinessGet.getBusiness({busId : '004'}, null, (error, response) => {
    console.log('-----------------------------GET RESPONSE START-----------------------------');
    console.log(response);
    console.log('-----------------------------GET RESPONSE END-----------------------------');
});