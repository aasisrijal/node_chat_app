const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; 

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.on('disconnect', () => {
			console.log('user disconnected');
		})

	//listening to event emitted by the client
	socket.on('createMessage', (message) =>{
		console.log('created message', message);
		//io.emit emits to all the users but socket.emit to one only 
		// io.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })
		socket.broadcast.emit('newMessage', {
			from: message.from,
			text: message.text, 
			createdAt: new Date().getTime()
		})
	})

	//event emitted by server
	// socket.emit('newMessage', {
	// 	from: 'aasis',
	// 	text: 'can you come to my house',
	// 	createdAt: '123'
	// })
})

server.listen(port, () =>{
	console.log(`Server is running on ${port}`);
})
