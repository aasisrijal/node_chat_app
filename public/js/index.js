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

socket.on('newLocationMessage', (message) => {
	var li = jQuery('<li></li>')
	var a = jQuery('<a target="_blank">Current location of mine</a>')
	li.text(`${message.from}: `)
	a.attr('href', message.url)
	li.append(a)
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

var sendLocation = jQuery('#send_location')
sendLocation.on('click', function() {
	if (!navigator.geolocation) {
		return alert('no geolocation support')
	}
	navigator.geolocation.getCurrentPosition(function (position) {
		console.log(position)
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function() {
		alert('unable to fetch location')
	})
})