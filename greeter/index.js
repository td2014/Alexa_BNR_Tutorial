'use strict';
var APP_ID = 'amzn1.ask.skill.50996551-2248-4aa8-859e-6f388b2cb978';
var AlexaSkill = require('./AlexaSkill');
var SPEECH_OUTPUT = 'Hello.';
var SPEECH_OUTPUT_FRENCH = 'Bohwn jour. cawhm mohn saah vaah.';

var GreeterService = function() {
    AlexaSkill.call(this, APP_ID);
};
GreeterService.prototype = Object.create(AlexaSkill.prototype);

var helloLaunchResponseFunction = function(intent, session, response) {
    response.tell(SPEECH_OUTPUT);
};
var helloResponseFunction = function(intent, requestTimestamp, session, response) {
    var currTime = new Date(requestTimestamp);
    response.tell(SPEECH_OUTPUT + " It is " + currTime.toLocaleTimeString() + " "+ 'GMT');
};
var helloResponseFrenchFunction = function(intent, requestTimestamp, session, response) {
    var currTime = new Date(requestTimestamp);
    response.tell(SPEECH_OUTPUT_FRENCH + " It is " + currTime.toLocaleTimeString() + " "+ 'GMT');
};
GreeterService.prototype.eventHandlers.onLaunch = helloLaunchResponseFunction;

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
