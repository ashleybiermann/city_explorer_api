'use strict';

// define packages
require('dotenv').config(); // good to keep this one first, to avoid
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000; // look to an evn variable called PORT, or default to 3000
const app = express(); //app is our entire server

//configs
app.use(cors()); // configure the app to talk to other local websites without blocking them

app.get('/location', (req, res) => {
  console.log('hey from the server');
  const dataFromLocationJson = require('./data/location.json'); // just a little proof of life. in browser 'localhost:3000/location'

  const city = req.query.city;

  //target the useful data !! WILL be UseFul TO THE WEATHER ASPEcT
  const latitudeCoord = dataFromLocationJson[0].lat;
  console.log(latitudeCoord);
  const longitudeCoord = dataFromLocationJson[0].lon;
  console.log(longitudeCoord);
  
  const coordinates = []; //push into array
  coordinates.push(latitudeCoord, longitudeCoord);

  // send resulting array to front end
  let location = new Location(dataFromLocationJson[0], city);
  res.send(location);
});

function Location (entireDataObject, city) {
  this.search_query = city;
  this.formatted_query = entireDataObject.display_name;
  this.latitude = entireDataObject.lat;
  this.longitude = entireDataObject.lon;
}

app.listen(PORT, () => {
  console.log('Hello from the port 3000 ' + PORT); // in browser 'localhost:3000'
});