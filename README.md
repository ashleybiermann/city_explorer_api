## Synopsis

City Explorer is an app that allows a user to access location maps, weather, and trail information for a city they request. 

At the top of the file there should be a short introduction and/ or overview that explains **what** the project is. This description should match descriptions added for package managers (Gemspec, package.json, etc.)

## Getting Started
Run npm install at root directory
Gather your own API keys (see below) and put them in a .env files in root directly

````environment````
PORT=3000
GEOCODE_API_KEY=aaaaaaaaaaaaaaaa
WEATHER_API_KEY=aaaaaaaaaaaaaaaa
TRAILS_API_KEY=aaaaaaaaaaaaaaa
````environment````

## Code Example
app.get('/trails', (req, res) => {
  console.log('hey from the server - trails');
  const url = `https://www.hikingproject.com/data/get-trails`;
  const myKey = process.env.TRAILS_API_KEY;

  const queryForSuper = {
    key: myKey,
    lat: req.query.latitude,
    lon: req.query.longitude,
    format: 'json',
    limit: 10,
  };

  superagent.get(url).query(queryForSuper).then(resultFromSuper => {
    const trailArr = resultFromSuper.body.trails.map(current => {
      return new Trail(current);
    });
    res.send(trailArr);
  }).catch(error => {
    console.log('error from trail ', error);
    res.send(error).status(500);
  });
});

Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

## Motivation

This projects exists to provide the user with a central location for many useful pieces of information based on a desired location. All of the info is accessed by simply entering a city name.

A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.

## Installation

Provide code examples and explanations of how to get the project.

## API Reference

[Superagent Docs](https://visionmedia.github.io/superagent/)
[Location IQ Geocoding API](https://locationiq.com/docs#forward-geocoding)
[Weather Bit API Docs](https://www.weatherbit.io/)
[The Hiking Project API Docs](https://www.hikingproject.com/data)

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)

## Features
_______
Number and name of feature: Repository Set Up

Estimate of time needed to complete: 90 minutes

Start time: 3:30pm

Finish time: 4:50pm

Actual time needed to complete: 80 minutes
_______
Number and name of feature: Locations

Estimate of time needed to complete: 60 minutes

Start time: 4:50pm

Finish time: 6:15pm

Actual time needed to complete: 85 minutes
_______
Number and name of feature: Weather

Estimate of time needed to complete: 70 minutes

Start time: 8:10pm

Finish time: 10:30pm, with break

Actual time needed to complete: 90 minutes
______
Number and name of feature: 

Estimate of time needed to complete: 90 minutes

Start time: 3:30pm

Finish time: 5:10pm

Actual time needed to complete: 100 minutes
______
Number and name of feature: Weather

Estimate of time needed to complete: 90 minutes

Start time: 5:30pm

Finish time: 6:30pm 

Actual time needed to complete: 60 minutes
______
Number and name of feature: Weather

Estimate of time needed to complete: 90 minutes

Start time: 6:45pm

Finish time: 7:45pm

Actual time needed to complete: 60 minutes
______
Number and name of feature: Database setup

Estimate of time needed to complete: 90 minutes

Start time: 3:15pm

Finish time: 4:20pm

Actual time needed to complete: 65 minutes
_____
Number and name of feature: Server

Estimate of time needed to complete: 90 minutes

Start time: 4:25pm

Finish time: 5:40pm

Actual time needed to complete: 75 minutes
_____
Number and name of feature: Movies

Estimate of time needed to complete: 80 minutes

Start time: 3:30pm

Finish time: 4:30pm

Actual time needed to complete: 60 minutes
_____
Number and name of feature: Yelp

Estimate of time needed to complete: 80 minutes

Start time: 4:40pm

Finish time: pm

Actual time needed to complete:  minutes