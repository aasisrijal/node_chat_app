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
})