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

MyMadlib.prototype.get_state = function(){
    return this.get_object('storyTemplate');
};

MyMadlib.prototype.set_state = function(storyTemplateObject){
    this.add_object(storyTemplateObject);
    return this.get_object('storyTemplate');
};

MyMadlib.prototype.get_current_wordtype_spoken = function(){
   var storyTemplate = this.get_object('storyTemplate');
   console.log('get_current_wordtype_spoken: storyTemplate.templateFillMap = ', storyTemplate.templateFillMap);
   
   for (let iPos=0; iPos < storyTemplate.wordfilltype.length; iPos++) {
       let currKey = 'word_'+iPos.toString();
       if (storyTemplate.templateFillMap.get(currKey)===null ) {
           return storyTemplate.wordfilltype[iPos];
       } 
   }
   return null;  // story is filled out.
};

MyMadlib.prototype.set_current_word = function(currWord){
   var storyTemplate = this.get_object('storyTemplate');
   console.log('set_current_word: storyTemplate.templateFillMap = ', storyTemplate.templateFillMap);
   
   for (let iPos=0; iPos < storyTemplate.wordfilltype.length; iPos++) {
       let currKey = 'word_'+iPos.toString();
       if (storyTemplate.templateFillMap.get(currKey)===null ) {
           storyTemplate.templateFillMap.set(currKey, currWord);
           return storyTemplate.templateFillMap.get(currKey);
       } 
   }
   return null;  // story is filled out.
};


MyMadlib.prototype.get_full_story_spoken = function(wordArray){
    return null;
};

MyMadlib.prototype.set_story_template = function(storyTemplateMap){

// Transform the storyTemplate into something than can be modified via lodash templates.
// The below regex filters for text:  {keyword} or .  or , or words after a space or the first
// word in the string. Attempts to filter out malformed keywords like {word  (no closing right curly brace.
// Allowable:  
//    {keyword}
//    Word.  OR Word, OR Word (space)  -Any where.
//    {abc. OR {abc, OR {abc(space)   or  abc}  NOT allowed

    var storyTemplate = storyTemplateMap.content;
    console.log('set_story_template: name = ', storyTemplateMap.name); 
    console.log('set_story_template: storyTemplate = ', storyTemplate);

    var wordArray = _.words(storyTemplate, /[,.]|\{[a-zA-Z]+\}|\s[a-zA-Z]+(?!\})(?=\s|\.|\,)|^[a-zA-Z]+(?!\})(?=\s|\.|\,)/g);

    var counter = 0;
    var wordFillTypeArray = new Array();
    var storyArray = new Array();
    var templateFillMap = new Map();
    var recognizedWordTypes = require('./recognizedWordTypes.js');  
 
    for (let iWord of wordArray) {
        if (iWord.charAt(0)==="{" && iWord.charAt(iWord.length-1)==="}") {  //Keyword detected.
            let expandedType = recognizedWordTypes.TYPES[iWord.substring(1,iWord.length-1)];
            if (expandedType!==undefined) {
                wordFillTypeArray.push(expandedType);
                let iWordRep = 'word_'+counter.toString();                 
                storyArray.push('${'+iWordRep + '} ');
                templateFillMap.set(iWordRep, null);
                counter+=1; 
            } else {
                console.log('Error.  Word type currently supported: ', iWord);
            }     
        } else {
            storyArray.push(iWord+' ')
        }
    }

    var newStoryTemplate = '';
    for (let iWord of storyArray){
        newStoryTemplate+=iWord;    
    }

    var storyTemplateObject = { 'name':'storyTemplate',
                                'content':newStoryTemplate,
                                'wordfilltype': wordFillTypeArray,
                                'templateFillMap': templateFillMap};
    this.add_object(storyTemplateObject);
    console.log('storyTemplateObject', storyTemplateObject);
    return storyTemplate;
};

module.exports = MyMadlib;
