var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', ()=> {
		var from = 'sita';
		var text = 'hello you';
		var message = generateMessage(from, text);

		expect(typeof message.createdAt).toBe('number')
		expect(message).toMatchObject({
			from,
			text
		})
		
	})
})

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'ram'
		var latitude = 14
		var longitude = 15
		var url = 'https://www.google.com/maps?q=14,15'
		var location = generateLocationMessage(from, latitude, longitude)

		expect(typeof location.createdAt).toBe('number')
		expect(location).toMatchObject({
			from,
			url
		})

	})
})