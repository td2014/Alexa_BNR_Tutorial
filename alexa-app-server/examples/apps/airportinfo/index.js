'use strict';
module.change_code = 1;
var Alexa = require('alexa-app');
var skill = new Alexa.app('airportinfo');
var AlexaFAADataHelper = require('./Alexa_FAA_data_helper');
var reprompt = 'I didn\'t hear an airport code, tell me an Airport code to get delay '
    + 'information for that airport.';

skill.launch(function(request, response) {
    var prompt = 'For delay information, tell me an Airport code.';
    response.say(prompt).reprompt(reprompt).shouldEndSession(false);
});

module.exports = skill;
