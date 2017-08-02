'use strict';
var _ = require('lodash');
var requestPromise = require('request-promise');
var ENDPOINT = 'http://services.faa.gov/airport/status/';

function AlexaFAADataHelper() {}

AlexaFAADataHelper.prototype.getAirportStatus = 
function(airportCode) {
    var options = {
        method: 'GET',
        uri: ENDPOINT + airportCode,
        json: true
    };

    return requestPromise(options);
};

AlexaFAADataHelper.prototype.formatAirportStatus = function(airportStatusObject) {

    if (airportStatusObject.delay === 'true') {
        var template = _.template('There is currently a delay for ${airport}. ' +
            'The average delay time is ${delay_time}. ' +
            'Delay is because of the following: ${delay_reason}.');
        return template({
            airport: airportStatusObject.name,
            delay_time: airportStatusObject.status.avgDelay,
            delay_reason: airportStatusObject.status.reason
        });
        } else {
          // no delay
          var template = _.template('There is currently no delay at ${airport}.');
          return template({ airport: airportStatusObject.name });
        }
    };

module.exports = AlexaFAADataHelper;
