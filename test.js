function Person(first, last) {
    this.first = first;
    this.last = last;
}
Person.prototype.fullName = function() {
    return this.first + ' ' + this.last;
};    

var s = new Person('Jimmy', 'Jones');
console.log(s.fullName());
