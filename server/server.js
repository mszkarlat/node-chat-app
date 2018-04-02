const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const app = express();
const port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(path.join(__dirname + '/../public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app!'));


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        }

        socket.join(params.room);

        // io.emit -> io.to('The Office Fans').emit()
        // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
        // socket.emit

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined ${params.room}!`));       
        callback(null);
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
      
    });

    socket.on('createLocationMessage', (coords,callback) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.lat, coords.long));
        callback();
    });

    socket.on('createEmail', (data) => {
        console.log('createEmail', data);
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});