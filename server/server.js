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
	// socket.on('createEmail', (newEmail) =>{
	// 	console.log('createEmail', newEmail);
	// })

	// socket.emit('newEmail', {
	// 	from: 'mikee@gmail.com',
	// 	text: 'how are you? call me soon'
	// });

	socket.on('createMessage', (newMessage) =>{
		console.log('created message', newMessage);
	})

	socket.emit('newMessage', {
		from: 'aasis',
		text: 'can you come to my house',
		createdAt: '123'
	})
})

server.listen(port, () =>{
	console.log(`Server is running on ${port}`);
})
