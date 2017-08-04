var assert = require('assert');
var testContainer = require('../my_container.js');

describe('MyContainer', function() {
    describe('get_contextual_help()', function() {
        it('should return "You can say, give me a list."  when you have created a new MyContainer', function() {
            assert.equal('You can say, give me a list.', testContainer.get_contextual_help());
        });
    });
});
