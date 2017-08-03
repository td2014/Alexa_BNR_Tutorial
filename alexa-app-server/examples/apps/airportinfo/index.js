'use strict';
module.change_code = 1;
var Alexa = require('alexa-app');
var skill = new Alexa.app('airportinfo');
var AlexaFAADataHelper = require('./Alexa_FAA_data_helper');
var _ = require('lodash');

var reprompt = 'I didn\'t hear an airport code, tell me an Airport code to get delay '
    + 'information for that airport.';

skill.launch(function(request, response) {
    var prompt = 'For delay information, tell me an Airport coder.';
    response.say(prompt).reprompt(reprompt).shouldEndSession(false);
});

skill.intent('airportInfoIntent', {
    'slots': {
        'AIRPORTCODE': 'FAACODES'
    },
    'utterances': ['{|flight|airport} {|delay|status} {|info} {|for} {-|AIRPORTCODE}']
    },
    function(request, response) {
        var airportCode = request.slot('AIRPORTCODE');
        if (_.isEmpty(airportCode)) {
            var prompt = 'I didn\'t hear an airport code.  Tell me an airport code.';
            response.say(prompt).reprompt(reprompt).shouldEndSession(false);
            return true;
        } else {
            var alexaFAADataHelper = new AlexaFAADataHelper();
            return alexaFAADataHelper.getAirportStatus(airportCode).then(function(airportStatus){
                var prompt = alexaFAADataHelper.formatAirportStatus(airportStatus);
                response.say(prompt);
            });
        }
    }
);

module.exports = skill;
