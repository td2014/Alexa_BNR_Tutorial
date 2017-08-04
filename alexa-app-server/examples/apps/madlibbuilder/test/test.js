var assert = require('assert');
var MyContainer = require('../my_container.js');
var TestContainer = new MyContainer('myTestContainer');

describe('MyContainer', function() {
    describe('get_contextual_help()', function() {
        it('should return "You can say, give me a list."  when you have created a new MyContainer', function() {
            assert.equal('You can say, give me a list.', TestContainer.get_contextual_help());
        });
    });
});
