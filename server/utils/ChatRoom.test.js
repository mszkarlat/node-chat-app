let expect = require('chai').expect;

const {ChatRoom} = require('./ChatRoom');


describe('User class',() => {
    var room; 
    beforeEach(() => {
        room = new ChatRoom();
        room.users = [{
            id: 1,
            name: 'John',
            room: 'Node Course'
        },{
            id: 2,
            name: 'Mike',
            room: 'Node Course'
        },{
            id: 3,
            name: 'Syln',
            room: 'Node Course'
        }]
    });
    
    it('should add a new user',() => {
        var room = new ChatRoom();
        var user = {
            id: '123',
            name: 'Martin',
            room: 'The Office Fans'
        };
        var resUser = room.addUser(user.id, user.name, user.room);
        console.log([user]);    
        console.log(room.users);   
        expect(room.users).to.deep.equal([user]);
    });

    it('should return list of users', () => {
        var userList = room.getUserList('Node Course');
        console.log(room.getUserList('Node Course'));
        expect(userList).to.deep.equal(['John','Mike','Syln']);
    });

    it('should get a user', () => {
        var user = room.getUser(1);
        console.log(user);
        expect(user).to.deep.equal({
            id: 1,
            name: 'John',
            room: 'Node Course'
        });
    });

    it('should not get a user', () => {
        var user = room.getUser(4);
        console.log(user);
        expect(user).to.not.exist;
    });

    it('should remove a user', () => {
        var userList = room.getUserList('Node Course');
        expect(userList).to.deep.equal(['John','Mike','Syln']);
        room.removeUser(1);
        var userList = room.getUserList('Node Course');

        expect(userList).to.deep.equal(['Mike','Syln']);
    });

    it('should not remove a user', () => {
        var userList = room.getUserList('Node Course');
        expect(userList).to.deep.equal(['John','Mike','Syln']);
        room.removeUser(4);
        var userList = room.getUserList('Node Course');

        expect(userList).to.deep.equal(['John','Mike','Syln']);
    });

    


});