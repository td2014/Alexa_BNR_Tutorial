var assert = require('assert');
var MyContainer = require('../my_container.js');
var myTestContainer = new MyContainer('myTestContainer');
var MyMadlibClass = require('../my_madlib.js');
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
            var myMadlib = new MyMadlibClass('myMadlibName');
            assert.equal('myMadlibName', myMadlib.get_name());
        });
    });
});

describe('MyMadlibClass', function() {
    describe('get_current_wordtype_spoken()', function() {
        it('should return "adjective"  when you have loaded Summertime madlib and called get_current_wordtype_spoken()', function() {
            var myMadlib = new MyMadlibClass('myMadlibName');
            myMadlib.set_story_template(madlibStories.MADLIBS[1]);
            assert.equal('adjective', myMadlib.get_current_wordtype_spoken());
        });
    });
});

describe('MyMadlibClass', function() {
    describe('get_current_wordtype_spoken()', function() {
        it('should return "noun"  when you have loaded Summertime madlib, set the first word, then get_current_wordtype_spoken()', function() {
            var myMadlib = new MyMadlibClass('myMadlibName');
            myMadlib.set_story_template(madlibStories.MADLIBS[1]);
            myMadlib.set_current_word('happy');  // adjective
            assert.equal('noun', myMadlib.get_current_wordtype_spoken());
        });
    });
});

describe('MyMadlibClass', function() {
    describe('get_current_wordtype_spoken()', function() {
        it('should return "null"  when you have loaded Summertime madlib, set the first and second words, then get_current_wordtype_spoken()', function() {
            var myMadlib = new MyMadlibClass('myMadlibName');
            myMadlib.set_story_template(madlibStories.MADLIBS[1]);
            myMadlib.set_current_word('happy');  // adjective
            myMadlib.set_current_word('car');  // noun 
            assert.equal(null, myMadlib.get_current_wordtype_spoken());
        });
    });
});

describe('MyMadlibClass', function() {
    describe('get_current_wordtype_spoken()', function() {
        it('should return "noun"  when you have restored with Summertime madlib with first word already filled out, then get_current_wordtype_spoken()', function() {
            var myMadlib = new MyMadlibClass('myMadlibName');
            myMadlib.set_story_template(madlibStories.MADLIBS[1]);
            myMadlib.set_current_word('happy');  // adjective
            var previousState = myMadlib.get_state();
            var myMadlib2 = new MyMadlibClass('myMadlibName2');
            myMadlib2.set_state(previousState);
            assert.equal('noun', myMadlib2.get_current_wordtype_spoken());
        });
    });
});

describe('MyMadlibClass', function() {
    describe('get_story_spoken()', function() {
        it('should return "null"  when you have loaded Summertime madlib, set the first word, then get_story_spoken()', function() {
            var myMadlib = new MyMadlibClass('myMadlibName');
            myMadlib.set_story_template(madlibStories.MADLIBS[1]);
            myMadlib.set_current_word('happy');  // adjective
            assert.equal(null, myMadlib.get_story_spoken());
        });
    });
});

describe('MyMadlibClass', function() {
    describe('get_story_spoken()', function() {
        it('should return filled-out story  when you have loaded Summertime madlib, set the first and second words, then get_story_spoken()', function() {
            var myMadlib = new MyMadlibClass('myMadlibName');
            myMadlib.set_story_template(madlibStories.MADLIBS[1]);
            myMadlib.set_current_word('happy');  // adjective
            myMadlib.set_current_word('car');  // noun
            var targetStory = 'Once  upon  a  summertime ,  there  was  this happy  bicycle  which  looked  like  a  big car . ';
            assert.equal(targetStory, myMadlib.get_story_spoken());
        });
    });
});
