'use strict';
module.change_code = 1;
var _ = require('lodash');
var Skill = require('alexa-app');
var SkillService = new Skill.app('madlibbuilder');
var AWS = require('aws-sdk');

var madlibStories = require('./madlibStories.js');
var MyContainer = require('./my_container.js');
var MyMadlibContainer = new MyContainer('MyMadLibContainer');
var MyMadlibClass = require('./my_madlib.js');

// Setup dynamoDB
AWS.config.update({
    region: 'us-east-1',
    endpoint: 'https://dynamodb.us-east-1.amazonaws.com'});
var docClient = new AWS.DynamoDB.DocumentClient();

// Define intents for madlibbuilder app.
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

        var prompt = 'Welcome to Madlibs.';

// Load madlib stories and containers

    for (let iStory of madlibStories.MADLIBS) {
        console.log('madlibbuilder: iStory = ', iStory);
        var myTmpMadlib = new MyMadlibClass(iStory.name);
        myTmpMadlib.set_story_template(iStory);
        MyMadlibContainer.add_object(myTmpMadlib);
    }

// Check to see if user has previously stored unfinished madlib   

        var unfinished_madlib = false;

/*        var dbParams = {
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
*/
        // If previous unfinished madlib exists, ask user if they want to continue
        // or start a new madlib
//        if (unfinished_madlib === true){
//            console.log('Unfinished madlib from previous session exists.');

//        } else {

              prompt+= prompt + ' Here is the list of madlibs you can play.';

              var name1 = '';
              prompt+=prompt+ 'Just say, play' + name1 + 
                  ' if you want to play the ' + name1 + ' madlib, or any other one from the list.'; 

              response.sessionObject.set('AppState', 'ChooseMadlib'); 
              response.say(prompt).shouldEndSession(false);
//        }

    });

SkillService.intent('FillIntent', {
    },
    function(request, response) {
        var currentGame = MyMadlibContainer.get_object('Summertime');
        var prompt = 'Please give me one ' + currentGame.get_current_wordtype_spoken();
        response.say(prompt).shouldEndSession(false);
        response.sessionObject.set('AppState', 'FillingMadlib'); 
    });

SkillService.intent('WordIntent', {
    'slots': {'CURRENTWORD': 'AMAZON.LITERAL'},
    'utterances': ['{CURRENTWORD}'] 
    },
    function(request, response) {

        var currWord = request.slot('CURRENTWORD');
        var currentGame = MyMadlibContainer.get_object('Summertime');
        
        currentGame.set_current_word(currWord);

        var prompt = 'Please give me one ' + currentGame.get_current_wordtype_spoken();
        if (prompt === null) {
            prompt = 'The madlib is filled out.  Do you want me to read it back?';
            response.sessionObject.set('AppState', 'DoneMadlib'); 
        }
        response.say(prompt).shouldEndSession(false);
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
