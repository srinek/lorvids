'use strict';
let googleAuthService = require('../src/services/google-auth-service');
let googleCalendarService = require('../src/services/google-calendar-service');
let userService = require('../src/services/user-service');

//export NODE_ENV=production
process.env["NODE_CONFIG_DIR"] = __dirname + "/configDir/";
//googleAuthService.generateTokens("4/ZQAMlELa_PT9ctCTfJRt7lJLcj9cIR8ilLkTsBKA4YKc5mYn1jb68I8QXnYp4VU7knypXehpkxFe8dw2sb3GajM");

/* const tokens = JSON.parse(`{ "access_token": "ya29.GlwhBl6JrOToUAAKiLLK5RfneO6AV_FxbyGI3q1eiBCiVqRYbUO3g8TB8Vfoc8AxtnNlDApLdyiQherk-B86Ey1saP7wz_R9cJhYaTHAGPwsZuEiPRYSMmkalzue0g",
"scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar",
"token_type": "Bearer",
"id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImEwN2VjN2JkYThjY2M0Mzg1NTY1NWI5ZjIyNDVhNGUyZGUyMGFlNWMifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNzE2MzkzOTg2MS05ZTllNTJtMGt1cXNvYzdtb2NxYjltdTYwYWIydWxxbC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjM3MTYzOTM5ODYxLTllOWU1Mm0wa3Vxc29jN21vY3FiOW11NjBhYjJ1bHFsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA0MzUzODY4MzE4NDY1Njg0MTQ5IiwiYXRfaGFzaCI6ImUwWXQ1VjB3OVlCcVdId0RRdUdyd3ciLCJuYW1lIjoiTmFuZGFraXNob3JlIE5la2thbnRpIiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8taVFOVXZwMVhhMncvQUFBQUFBQUFBQUkvQUFBQUFBQUFFUlUvMWVCLTdXQ18zcVUvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6Ik5hbmRha2lzaG9yZSIsImZhbWlseV9uYW1lIjoiTmVra2FudGkiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTUzNzY5OTQ2MiwiZXhwIjoxNTM3NzAzMDYyfQ.IUWquWqrhFmROIgOVeMQvTzodye64st8WksC9H5rlOAudajXmiPCI7IVbS90s1pHvHp-sN1JGBMBFXu_MSgmhvU1TXM7KnM8MYM_3YeJ0AWwjbCpAzF0lkhf2zgcEU4zjKhhGKjI66WYXBGPxh2zZBil8yCI_-bNq0mlmtZSaY6xE85HcOZLnaUrSn4Zrr1NC7D67O7AIMJU9s17h9sTy4NvydxnjK788TfWbWd4XsJzdrfWzm9sn0kts9rScBL56MwAIcvLIJZY-39sCIkhDUXMjQDOV9X3VH53ejIsmP1ryO0BH02HZ7Xf9_6x4fofoXtQ5wE92DQa0Me9Fl3h0A",
"expiry_date": 1537702937323 }`); */

//googleAuthService.saveTokens(tokens);

let userPromise = userService.getUserDetails("srinek@gmail.com");
userPromise.then( (userData) => {
    console.log("userData ", userData );
    console.log("tokenString ", JSON.parse(userData.tokens));
    googleCalendarService.listEvents(JSON.parse(userData.tokens));
});


