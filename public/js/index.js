var socket = io('http://localhost:3000');

socket.on('connect',function(){
    console.log('connected to server'); 

});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newEmail', function(email){
    console.log('New email', email);
   // console.log(new Date(email.created_at).toDateString());
});

socket.on('newMessage', function(message){
    console.log('newMessage',message);
});

