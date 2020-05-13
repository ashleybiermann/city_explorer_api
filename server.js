'use strict';

// define packages DEPENDENCIES
require('dotenv').config(); // good to keep this one first, to avoid
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const PORT = process.env.PORT || 3001;
const app = express(); //app is our entire server

//configs
app.use(cors()); // configure the app to talk to other local websites without blocking them

app.get('/location', (req, res) => {
  console.log('hey from the server - location');
  const url = 'https://us1.locationiq.com/v1/search.php';
  const myKey = process.env.GEOCODE_API_KEY;
  const city = req.query.city;

  const queryForSuper = {
    key: myKey,
    q: city,
    format: 'json',
    limit: 1,
  };

  superagent.get(url).query(queryForSuper).then(resultFromSuper => {
    let location = new Location(resultFromSuper.body[0], city);
    res.send(location);
  }).catch(error => {
    res.send(error).status(500);
  });
});

function Location (entireDataObject, city) {
  this.search_query = city;
  this.formatted_query = entireDataObject.display_name;
  this.latitude = entireDataObject.lat;
  this.longitude = entireDataObject.lon;
}


app.get('/weather', (req, res) => {
  console.log('hey from the server - weather');
  const url = `https://api.weatherbit.io/v2.0/forecast/daily`;
  const myKey = process.env.WEATHER_API_KEY;

  const queryForSuper = {
    key: myKey,
    lat: req.query.latitude,
    lon: req.query.longitude,
    format: 'json',
    limit: 8,
  };

  superagent.get(url).query(queryForSuper).then(resultFromSuper => {
    const weatherArr = resultFromSuper.body.data.map(current => {
      return new Weather(current);
    });
    res.send(weatherArr);
  //target the useful data
  }).catch(error => {
    console.log('error from weather ', error);
    res.send(error).status(500);
  });
});

function Weather (obj) {
  this.forecast = obj.weather.description;
  this.time = obj.datetime;
}

app.listen(PORT, () => {
  console.log('Hello from the port 3000 ' + PORT); // in browser 'localhost:3000'
});
