//initiating request to server to open websocket
var socket = io();

socket.on('connect', () => {
	console.log('connected to server');

	//creating new message by the user
	// socket.emit('createMessage', {
	// 	from: 'harry',
	// 	text: 'i have no money',
	// 	createdAt: '345'
	// })
})
socket.on('disconnect', () => {
	console.log('dicconnected from server');
})


//listening to the newMessage emitted by server
socket.on('newMessage', (message) => {
	console.log('new message', message)

	var li = jQuery('<li></li>')
	li.text(`${message.from}: ${message.text}`)
	jQuery('#messages').append(li)
})


jQuery('#message_form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function() {

	})
})