const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

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
	socket.on('createMessage', (message, callback) =>{
		console.log('created message', message);
		//io.emit emits to all the users but socket.emit to one only 
		io.emit('newMessage', generateMessage(message.from, message.text))
		callback('this is from server yo');
	
	})

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
	})
})


server.listen(port, () =>{
	console.log(`Server is running on ${port}`);
})
