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
  const dataFromLocationJson = require('./data/location.json');
  // just a little proof of life. in browser 'localhost:3000/location'

  //target the useful data
  const latitudeCoord = dataFromLocationJson[0].lat;
  console.log(latitudeCoord);
  const longitudeCoord = dataFromLocationJson[0].lon;
  console.log(longitudeCoord);
  //push into array
  const coordinates = [];
  coordinates.push(latitudeCoord, longitudeCoord);

  // send resulting array to front end
  res.send(coordinates);
});

app.listen(PORT, () => {
  console.log('Hello from the port 3000 ' + PORT); // in browser 'localhost:3000'
});