let expect = require('chai').expect;

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'John';
        var text = 'Some message';
        var message = generateMessage(from,text);

        expect(message.createdAt).to.be.a('number');
        expect(message).to.include.keys('from','text');
    });
});

describe('generateLocationMessage', () => {
   it('should generate the correct location message object', () => {
        var from = 'John';
        var lat = 30;
        var long = 15;
        var url = 'https://www.google.com/maps?q=30,15'
        var message = generateLocationMessage(from,lat,long);
        console.log(message);
        expect(message.from).to.be.a('string');
        expect(message.url).to.be.a('string');
        expect(message.createdAt).to.be.a('number');
        expect(message).to.have.keys('from','url','createdAt');
   });
});