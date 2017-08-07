'use strict';
module.change_code = 1;
var _ = require('lodash');
var Skill = require('alexa-app');
var SkillService = new Skill.app('madlibbuilder');
var AWS = require('aws-sdk');

AWS.config.update({
   region: 'us-east-1',
   endpoint: 'https://dynamodb.us-east-1.amazonaws.com'});

var docClient = new AWS.DynamoDB.DocumentClient();

SkillService.intent('AMAZON.HelpIntent', {}, 
    function(request, response) {
        var prompt = 'How may I help you?'
        response.say(prompt).shouldEndSession(false);
    });

SkillService.sessionEnded( 
    function(request, response) {
        console.log('SessionEnded called.');
    });

SkillService.launch(
    function(request, response) {
        var prompt = 'Welcome to Madlibs. ' 
            + 'To create a new madLib, say create a madlib';
   
        var dbParams = {
            TableName : 'myMadlibDB',
            KeyConditionExpression: "userID = :currUserID",
            ExpressionAttributeValues: {":currUserID":"XYZ124"}
        };

        docClient.query(dbParams, function(err,data) {
            if (err) {
                console.log('Unable to query.  Error:', JSON.stringify(err,null,2));
            } else {
                console.log('Query succeeded.');
                data.Items.forEach(function(item) {
                    console.log(' -', item.madlibName);
                });
            }
        });

        // Array to keep track of madlib words
        var myWordArray = new Array();
    
        response.sessionObject.set('WordArray', myWordArray); 
        response.sessionObject.set('AppState', 'ChooseMadlib'); 
        response.say(prompt).shouldEndSession(false);

    });

SkillService.intent('FillIntent', {
    },
    function(request, response) {
        response.sessionObject.set('AppState', 'FillingMadlib'); 
    });

SkillService.intent('WordIntent', {
    'slots': {'CURRENTWORD': 'AMAZON.LITERAL'},
    'utterances': ['{CURRENTWORD}'] 
    },
    function(request, response) {
        
        var myWordArray = request.sessionAttributes.WordArray;
        var currWord = request.slot('CURRENTWORD');
        myWordArray.push(currWord);

        response.sessionObject.set('WordArray', myWordArray); 
        response.sessionObject.set('AppState', 'DoneMadlib'); 
        response.say('What?').shouldEndSession(false);
    });

SkillService.intent('ReadbackIntent', {}, 
    function(request, response) {
        response.sessionObject.set('AppState', 'End'); 
    });

SkillService.intent('PlayAgainIntent', {}, 
    function(request, response) {
        response.sessionObject.set('AppState', 'ChooseMadlib'); 
    });

SkillService.intent('EndGameIntent', {}, 
    function(request, response) {
        response.sessionObject.set('AppState', 'End'); 
    });

module.exports = SkillService;
