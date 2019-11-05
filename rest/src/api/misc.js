'use strict';
const serverless = require('serverless-http');
const express = require('express');
const googleAPIService = require('../services/google-auth-service');
let util = require('../common/util');
const app = express();

app.get('/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    next(); // http://expressjs.com/guide.html#passing-route control
});

app.get('/', function (req, res) {
    res.send('Health Check Pass');
});


app.get('/gauthurl', function (req, res) {
    try{
        let url = googleAPIService.generateAuthURL();
        //let response = util.success();
        let response = {"ack": "1", "url": url};
        res.send(response);
    }
    catch(e){
        console.error(e);
        res.send({"ack": "0", "error": "error generating auth code"});
    }
});

app.get('/gtokens', function (req, res) {
    try{
        const authCode = req.query.code;
        googleAPIService.generateTokens(authCode);
        res.send({"ack": "1"});
    }
    catch(e){
        console.error(e);
        res.send({"ack": "0", "error": "error generating auth code"});
    }
});

module.exports.misc = serverless(app);
