var socket = io('http://localhost:3000');

function scrollToBottom(){
    // Selectors
    var messages = $('#messages'); 
    var newMessage = messages.children('li:last-child');
    // Heights 
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop  + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect',function(){
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function(err){
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error');
        }
    });
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newEmail', function(email){
    console.log('New email', email);
   // console.log(new Date(email.created_at).toDateString());
});

socket.on('admin', function(message){
    console.log(message.text);
});

socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();   
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // console.log('newMessage',message);
    // var li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // $('#messages').append(li);
});

socket.on('updateUserList', function(users) {
    var template = $('#person-list-template').html();

    var html = Mustache.render(template, {
        users
    });
    $('#users').html(html); 
});

socket.on('newLocationMessage', (location) => {
    var formattedTime = moment(location.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();

    var html = Mustache.render(template, {
        from: location.from,
        url: location.url,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
    // console.log(location);
    // var formattedTime = moment(location.createdAt).format('h:mm a');
    // var li = $('<li></li>');
    // var a = $(`<a target="_blank">Link to my location</a>`);

    // li.text(`${location.from} ${formattedTime}: `);
    // a.attr('href',location.url);
    // li.append(a);
    // $('#messages').append(li);
});


$('#message-form').on('submit',function(e){
    e.preventDefault();
    //var text = ($(this)[0][0]).value;
    var text = $('[name=message]');
   
    socket.emit('createMessage', {
        text: text.val()
    }, function(){
        text.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', () => {
        
    locationButton.attr('disabled', 'disabled');
    locationButton.text('Sending Location...');

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position.coords);
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }, function () {
            console.log('callback geolocation');
            locationButton.attr('disabled', false);
            locationButton.text('Send Location');
        });
    }, function() {
        alert('Unable to fetch location.');
    });

});