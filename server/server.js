const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {ChatRoom} = require('./utils/ChatRoom');

const app = express();
const port = process.env.PORT;
let server = http.createServer(app);
let io = socketIO(server);
let room = new ChatRoom();

app.use(express.static(path.join(__dirname + '/../public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app!'));


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        room.removeUser(socket.id);
        room.addUser(socket.id, params.name, params.room);
        // io.emit -> io.to('The Office Fans').emit()
        // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
        // socket.emit

        io.to(params.room).emit('updateUserList',room.getUserList(params.room));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined ${params.room}!`));       
        callback(null);
    });

    socket.on('createMessage', (message, callback) => {
        var user = room.getUser(socket.id);
        
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
      
    });

    socket.on('createLocationMessage', (coords,callback) => {
        var user = room.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.lat, coords.long));
        }
       
        callback();
    });

    socket.on('createEmail', (data) => {
        console.log('createEmail', data);
    });
    
    socket.on('disconnect', () => {
        let user = room.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList',room.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
        }
    });

    socket.on('updateUserList', function(users){
        console.log('Users list', users);
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});