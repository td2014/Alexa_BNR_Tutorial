'use strict';
var _ = require('lodash');
var http = require('http');
var requestPromise = require('promise');

function AlexaFAADataHelper() {}

AlexaFAADataHelper.prototype.getAirportStatus = 
function(airportCode) {
    var options = {
        host: 'services.faa.gov',
        path: '/airport/status/'+airportCode+'?format=application/json'
    };
    var promise = new requestPromise(function (resolve, reject) {
        http.get(options, function (res) {
            const { statusCode } = res;
            let error;
            if (statusCode !== 200) {
                error = new Error('Request failed - status not 200\n');
                console.log('Error:  Status not 200.');
                reject('Error: Status not 200.');
                res.resume();
                return;
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (e) {
                    console.log('Inner Error Triggered.');
                    console.error(e.message);
                    reject(e.message);
                }
            });
            }).on('error', (e) => {
                console.log('Outer Error Triggered.');
                console.error(e.message);
                reject(e.message);
            });
    });
    return promise;
};

AlexaFAADataHelper.prototype.formatAirportStatus = function(airportStatusObjectRaw) {
    console.log('Format:  airportstatusObjectRaw = ', airportStatusObjectRaw);
    var airportStatusObject = JSON.parse(airportStatusObjectRaw);
    console.log('Format:  airportStatusObject.delay = ', airportStatusObject.delay);
    console.log('Format:  airportStatusObject.name = ', airportStatusObject.name);

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
