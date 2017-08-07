var assert = require('assert');
var MyContainer = require('../my_container.js');
var myTestContainer = new MyContainer('myTestContainer');
var MyMadlibClass = require('../my_madlib.js');
var myMadlib = new MyMadlibClass('myMadlibName');
var madlibStories = require('../madlibStories.js');

describe('MyContainer', function() {
    describe('get_contextual_help()', function() {
        it('should return "You can say, give me a list."  when you have created a new MyContainer', function() {
            assert.equal('You can say, give me a list.', myTestContainer.get_contextual_help());
        });
    });
});

describe('MyContainer', function() {
    describe('get_name()', function() {
        it('should return "myTestContainer"  when you have created a new MyContainer("myTestContainer")', function() {
            assert.equal('myTestContainer', myTestContainer.get_name());
        });
    });
});

describe('MyMadlibClass', function() {
    describe('get_name()', function() {
        it('should return "myMadlibName"  when you have created a new MyMadlibClass("myMadlibName")', function() {
            assert.equal('myMadlibName', myMadlib.get_name());
        });
    });
});

describe('MyMadlibClass', function() {
    describe('get_current_wordtype_spoken()', function() {
        it('should return "noun"  when you have loaded Summertime madlib and asked for second word', function() {
            assert.equal('noun', myMadlib.get_current_wordtype_spoken());
        });
    });
});

