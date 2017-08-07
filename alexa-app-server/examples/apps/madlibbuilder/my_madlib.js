// madlib class that inherits from MyContainer and adds 
// some specialization for handling stories.
'use strict';
var MyContainer = require('./my_container.js');

function MyMadlib function(name) {
    MyContainer.call(name){
    }
}
MyMadlib.prototype = Object.create(MyContainer.prototype);
MyMadlib.prototype.constructor = MyMadlib;

MyMadlib.prototype.get_current_wordtype_spoken = function(pos){
    return null;
};

MyMadlib.prototype.get_full_story_spoken = function(wordArray){
    return null;
};

MyMadlib.prototype.set_story_template = function(storyTemplate){
    this.add_object(storyTemplate)
    return storyTemplate;
}

module.exports = MyMadlib;
