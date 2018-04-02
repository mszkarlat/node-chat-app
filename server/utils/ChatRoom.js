[{
    id: '/#123123123123',
    name: 'Martin',
    room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class ChatRoom {
    constructor(){
        this.users = [];
    }

    addUser(id, name, room){
        var user = {id,name,room};

        this.users.push(user);
        return user;
    }

    removeUser(id){
        var deletedUser = this.getUser(id);
        console.log('deletedUser',deletedUser);
        if (deletedUser) {
            this.users = this.users.filter((user) => {
                return user != deletedUser;
            });
        }
        console.log('updated users:',this.users);

        return deletedUser;
    }
    
    getUser(id){
        var user = this.users.filter((user) => {
           return user.id === id;
        })[0];
        return user;
    }

    getUserList(room){
        var users = this.users.filter((user) => {
            return user.room === room;
        });
        var namesArray = users.map((user) => {
            return user.name;
        })
        return namesArray;
    }
}

module.exports = {
    ChatRoom
}

/*
    var users = [];

    var addUser = (id, name, room) => {
        users.push({});
    }

    module.exports = {addUser}
*/