'use strict';
var APP_ID = 'amzn1.ask.skill.50996551-2248-4aa8-859e-6f388b2cb978';
var AlexaSkill = require('./AlexaSkill');
var SPEECH_OUTPUT = 'Hello';
var SPEECH_OUTPUT_FRENCH = 'Bonjour. cawhm mohn saah vaah';

var GreeterService = function() {
    AlexaSkill.call(this, APP_ID);
};
GreeterService.prototype = Object.create(AlexaSkill.prototype);

var helloResponseFunction = function(intent, session, response) {
    response.tell(SPEECH_OUTPUT);
};
var helloResponseFrenchFunction = function(intent, session, response) {
    response.tell(SPEECH_OUTPUT_FRENCH);
};
GreeterService.prototype.eventHandlers.onLaunch = helloResponseFunction;

GreeterService.prototype.intentHandlers = {
    'HelloWorldIntent': helloResponseFunction,
    'HelloWorldFrenchIntent': helloResponseFrenchFunction
};

// This is a AWS Lambda Handler.  Handles JSON messages from the interface and routes them
// to the service.
exports.handler = function(event, context) {
    var greeterService = new GreeterService();
    greeterService.execute(event, context);
};
