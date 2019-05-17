const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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

	//socket.emit from Admin text Welcome to chat app
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'))

	//socket.broadcaast.emit from Admin text New user joines
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined')) 

	//listening to event emitted by the client
	socket.on('createMessage', (message) =>{
		console.log('created message', message);
		//io.emit emits to all the users but socket.emit to one only 
		io.emit('newMessage', generateMessage(message.from, message.text))
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text, 
		// 	createdAt: new Date().getTime()
		
	})
})


server.listen(port, () =>{
	console.log(`Server is running on ${port}`);
})
