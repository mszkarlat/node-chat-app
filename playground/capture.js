var re = /^\?\w*=(\w*)&room=(\w*)/g;

var string = '?name=Martin&room=lotr';

var test = re.exec(string);

console.log('test:',test);
