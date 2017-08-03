'use strict';
var _ = require('lodash');
var http = require('http');
//var requestPromise = require('request-promise');
var requestPromise = require('promise');
var ENDPOINT = 'http://services.faa.gov/airport/status/';

function AlexaFAADataHelper() {}

AlexaFAADataHelper.prototype.getAirportStatus = 
function(airportCode) {
    var options = {
        host: 'services.faa.gov',
        path: '/airport/status/'+airportCode+'?format=application/json'
    };
    var promise = new requestPromise(function (resolve, reject) {
        http.get(options, function (res) {
            var res2 = 'fake http result.'
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
//                const parsedData = JSON.parse(rawData);
                console.log(rawData);
                resolve(rawData);
            });
            }).on('error', (e) => {
                reject(e.message);
            });
    });
    return promise;
};

AlexaFAADataHelper.prototype.formatAirportStatus = function(airportStatusObject) {
      console.log('in formatAirportStatus: passed in airportStatusObject = ', airportStatusObject);
//      airportStatusObject = 'returnValue from formatAirportStatus';
      return airportStatusObject;
};
/*    if (airportStatusObject.delay === 'true') {
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
*/
module.exports = AlexaFAADataHelper;
