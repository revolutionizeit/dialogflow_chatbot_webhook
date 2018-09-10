const request = require('request');
const config = require('../config');

exports.getWeather = (geocity, cb) => {
	let response;
	request({
		uri: 'http://api.openweathermap.org/data/2.5/weather',
		qs: {
			q: geocity,
			appid: config.WEATHER_API
		}
	}, (error, response, body) => {
		if(!error && response.statusCode === 200){
			let weather = JSON.parse(body);
			response = weather.hasOwnProperty('weather') ? `The current weather for ${geocity} seems to be ${weather['weather'][0]['description']}` :
															'No appropriate weather details found'
			cb(response)
		} else {
			console.error(response.error);
			cb('Something went wrong!');
		}
	})
}