'use strict';

// define packages DEPENDENCIES
require('dotenv').config(); // good to keep this one first, to avoid
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');
const PORT = process.env.PORT || 3001;
const app = express(); //app is our entire server

//configs
app.use(cors()); // configure the app to talk to other local websites without blocking them

// database config
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error); // like console.log, but different color
client.connect().then(app.listen(PORT, () => {
  console.log('Hello from inside of the database at port ' + PORT); // in browser 'localhost:3000'
}));


//TODO: Format dates and times and days to match the cards
function Location(entireDataObject, city) {
  this.search_query = city;
  this.formatted_query = entireDataObject.display_name;
  this.latitude = entireDataObject.lat;
  this.longitude = entireDataObject.lon;
}

function Weather(obj) {
  this.forecast = obj.weather.description;
  this.time = obj.valid_date;
}

function Trail(obj) {
  this.name = obj.name;
  this.location = obj.location;
  this.length = obj.length;
  this.stars = obj.stars;
  this.star_votes = obj.starVotes;
  this.summary = obj.summary;
  this.trail_url = obj.url;
  this.conditions = obj.conditionStatus;
  this.condition_date = obj.conditionDate.slice(0, obj.conditionDate.indexOf(' '));
  this.condition_time = obj.conditionDate.slice(obj.conditionDate.indexOf(' '), 19);
}

app.get('/', (req, res) => {
  res.redirect('https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/');
});

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

  //if request exists in database, use it instead
  const sqlQuery = 'SELECT * FROM locations WHERE search_query=$1';
  const sqlValues = [city]; // heroku doesn't like this to be left as req.query.city
  client.query(sqlQuery, sqlValues)
    .then(resultFromSql => {
      console.log(resultFromSql);

      if (resultFromSql.rowCount > 0) {
        //send them stuff from sql
        //send a location looking object (with search_query, formatted_query...)
        res.send(resultFromSql.rows[0]);
      } else {
        superagent.get(url)
          .query(queryForSuper)
          .then(resultFromSuper => {
            const newLocation = new Location(resultFromSuper.body[0], city);

            //save into db
            const sqlQuery = 'INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES($1, $2, $3, $4)';
            const valueArray = [newLocation.search_query, newLocation.formatted_query, newLocation.latitude, newLocation.longitude];
            client.query(sqlQuery, valueArray);
            res.send(newLocation);
          });
      }
    })
    .catch(error => {
      res.send('Sorry, something went wrong.' + error).status(500);
    });
});

app.get('/weather', (req, res) => {
  console.log('hey from the server - weather');
  const url = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const myKey = process.env.WEATHER_API_KEY;

  const queryForSuper = {
    key: myKey,
    lat: req.query.latitude, // this is request query latitude. whatever the user puts in as the entry city, the lat and long coordinates are given back, and they look like this
    lon: req.query.longitude,
    format: 'json',
    days: 8,
  };

  superagent.get(url)
    .query(queryForSuper)
    .then(resultFromSuper => {
      const weatherArr = resultFromSuper.body.data.map(current => {
        return new Weather(current);
      });
      res.send(weatherArr);
    })
    .catch(error => {
      console.log('error from weather ', error);
      res.send('Sorry, something went wrong.' + error).status(500);
    });
});

app.get('/trails', (req, res) => {
  console.log('hey from the server - trails');
  const url = 'https://www.hikingproject.com/data/get-trails';
  const myKey = process.env.TRAILS_API_KEY;

  const queryForSuper = {
    key: myKey,
    lat: req.query.latitude,
    lon: req.query.longitude,
    format: 'json',
    maxResults: 10,
  };

  superagent.get(url)
    .query(queryForSuper)
    .then(resultFromSuper => {
      const trailArr = resultFromSuper.body.trails.map(current => {
        return new Trail(current);
      });
      res.send(trailArr);
    })
    .catch(error => {
      console.log('error from trail ', error);
      res.send('Sorry, something went wrong.' + error).status(500);
    });
});


app.listen(PORT, () => {
  console.log('Hello from the port ' + PORT); // in browser 'localhost:3000'
});
