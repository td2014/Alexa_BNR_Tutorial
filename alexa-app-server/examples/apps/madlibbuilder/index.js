'use strict';
module.change_code = 1;
var _ = require('lodash');
var Skill = require('alexa-app');
var SkillService = new Skill.app('madlibbuilder');

SkillService.launch(function(request, response) {
    var prompt = 'Welcome to Madlibs. ' 
        + 'To create a new madLib, say create a madlib';
    
    var myWordArray = new Array();
    myWordArray.push('Word1');
    
    response.sessionObject.set('WordArray', myWordArray); 
    console.log('SessionObject = ', response.sessionObject); 
    response.say(prompt).shouldEndSession(false);

});


SkillService.intent('AddWordIntent', {},
    function(request, response) {
        console.log('intent request: request = ', request);
        var myWordArray = request.sessionAttributes.WordArray;
        console.log('intent request: myWordArray = ', myWordArray);
        myWordArray.push('Word2');
        response.sessionObject.set('WordArray', myWordArray); 
        response.say('What').shouldEndSession(false);
});

module.exports = SkillService;
