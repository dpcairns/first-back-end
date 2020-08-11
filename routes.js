const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.js');
const request = require('superagent');
const app = express();

app.use(cors());

app.use(express.static('public'));

const { GEOCODE_API_KEY } = process.env;

async function getLatLong(cityName) {
    // 1) replace hard coded data with a call to the API
    // 2) add the GEOCODE_API_KEY to .env and pop it in the url
    // 3) add the city name from the query params
    const response = await request.get(`https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${cityName}&format=json`);

    // 4) go find the first city in the response
    const city = response.body[0];

    // 5) change its shape to fit the contract with the front end
    return {
        formatted_query: city.display_name,
        latitude: city.lat,
        longitude: city.lon,
    };
}

// 7) therefore, we need to make this route async
app.get('/location', async(req, res) => {
    try {
        const userInput = req.query.search;

        // 6) now that getLatLng is asynchronous, we must AWAIT it
        const mungedData = await getLatLong(userInput);

        res.json(mungedData);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


app.get('/chars', async(req, res) => {
    try {
        const response = await request.get('https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=char');
        const pokemon = response.body.results;

        const names = pokemon.map((poke) => {
            return poke.pokemon;
        });

        res.json(names);
        
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});



function getWeather(lat, lon) {
    // TODO: we make an api call to get the weather
    const data = weatherData.data;

    const forecastArray = data.map((weatherItem) => {
        return {
            forecast: weatherItem.weather.description,
            time: new Date(weatherItem.ts * 1000),
        };
    });

    return forecastArray;
}

app.get('/weather', (req, res) => {
    try {
        const userLat = req.query.latitude;
        const userLon = req.query.longitude;
    
        const mungedData = getWeather(userLat, userLon);
        res.json(mungedData);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = {
    app
};