// Generic container class
'use strict';
function MyContainer(name) {
    this.name = name;
    this.listOfObjects = new Array();
    this.contextualHelp = 'You can say, give me a list.';
}

// get_list_of_objects

MyContainer.prototype.get_list_of_objects_spoken = function() {
    var spokenList = null;
    
    for (let object of this.listOfObjects){
        spokenList+=object.name + ', ';  //I assume a comma adds a verbal pause.
    }
    return spokenList;
};

// add_object
MyContainer.prototype.add_object = function(objectToAdd){
     this.listOfObjects.push(objectToAdd);
     return objectToAdd;
};

// delete_object
MyContainer.prototype.delete_object = function(objectToDelete){
  
    var pos = this.listOfObjects.indexOf(objectToDelete);

    if (pos===null) {
        return null;  //object not found
    }
    var removedItem = this.listOfObjects.splice(pos, 1); 
    return removedItem;
};

// get_object
MyContainer.prototype.get_object = function(objectToGet){
    
    for (let object of this.listOfObjects){
        if (objectToGet===object.name) {
           return object;
        }
    }
    return null;  //object not found 
};

// get_contextual_help
MyContainer.prototype.get_contextual_help = function(){
    return this.contextualHelp;
};

// set_contextual_help
MyContainer.prototype.set_contextual_help = function(helpMessage){
    this.contextualHelp = helpMessage;
    return this.contextualHelp;
};

module.exports = MyContainer;
