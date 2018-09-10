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
	console.log('Received a post request');
	if(!req.body) return res.sendStatus(400)
	let data = req.body;

	//let action = data.result.action ? data.result.action : '';
	console.log('Here is the post request from DialogFlow');
    console.log(data);

	/*switch(action){
		case('get-weather'):
	*/
		console.log('Got geo city parameter from DialogFlow '+data.queryResult.parameters['geo-city']);
		let geocity = data.queryResult.parameters['geo-city'] ? data.queryResult.parameters['geo-city'] : 'London';
		weather.getWeather(geocity, response => {
			/*
			return res.json({
				speech: responseObj,
				displayText: responseObj,
				source: 'OpenWeatherMap-webhook-response'
			})*/
			return res.json({
				fulfillmentText: response
				,fulfillmentMessages: [{"text": {"text": [response]}}]
				,source:"OpenWeatherMap-webhook-response"
			})

		});
	/*		break;
		
		default:
			return res.json({
				speech: 'Invalid request',
				displayText: 'Invalid request',
				source: 'no-webhook-found'
		})
	}
	*/
})

app.listen(process.env.PORT || 8000, () => {
	console.log('Server up and running');
})

