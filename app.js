'use strict'

const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const weather = require('./src/weather');

app.use(bodyparser.urlencoded({
	extended: true
}))
app.use(bodyparser.json());

app.post('/webhook', (req, res) => {
	let data = req.body;
	let response;
	let action = data.result.action ? data.result.action : '';

	switch(action){
		case('get-weather'):
			let geocity = data.result.parameters['geo-city'] ? data.result.parameters['geo-city'] : 'Berlin';
			weather.getWeather(geocity, response => {
				return res.json({
					speech: response,
					displayText: response,
					source: 'OpenWeatherMap-webhook-response'
				})
			});
			break;
		
		default:
			return res.json({
				speech: 'Invalid request',
				displayText: 'Invalid request',
				source: 'no-webhook-found'
		})
	}
})

app.listen(process.env.PORT || 8000, () => {
	console.log('Server up and running');
})

