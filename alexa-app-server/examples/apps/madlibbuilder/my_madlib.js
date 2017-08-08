// madlib class that inherits from MyContainer and adds 
// some specialization for handling stories.
'use strict';
var _ = require('lodash');
var MyContainer = require('./my_container.js');

function MyMadlib(name) {
    MyContainer.call(this, name);
}
MyMadlib.prototype = Object.create(MyContainer.prototype);
MyMadlib.prototype.constructor = MyMadlib;

MyMadlib.prototype.get_current_wordtype_spoken = function(pos){
   var storyTemplate = this.get_object('storyTemplate');
   console.log('storyTemplate.name = ', storyTemplate.name);
   console.log('storyTemplate.content = ', storyTemplate.content);
   return null;
};

MyMadlib.prototype.get_full_story_spoken = function(wordArray){
    return null;
};

MyMadlib.prototype.set_story_template = function(storyTemplate){

// Transform the storyTemplate into something than can be modified via lodash templates.
// The below regex filters for text:  {keyword} or .  or , or words after a space or the first
// word in the string. Attempts to filter out malformed keywords like {word  (no closing right curly brace.
// Allowable:  
//    {keyword}
//    Word.  OR Word, OR Word (space)  -Any where.
//    {abc. OR {abc, OR {abc(space)   or  abc}  NOT allowed

    var wordArray = _.words(storyTemplate, /[,.]|\{[a-zA-Z]+\}|\s[a-zA-Z]+(?!\})(?=\s|\.|\,)/g);

    console.log(wordArray);
    var storyTemplateObject = { 'name':'storyTemplate',
                                'content':storyTemplate };
    this.add_object(storyTemplateObject);
    return storyTemplate;
};

module.exports = MyMadlib;
