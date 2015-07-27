Google Places API Client
========================

Node.js library for the Google Places API. Official docs [here][docs]


Install
-------
`npm install googleplacesapi`


Usage
-----
```
var googleplacesapi = require('googleplacesapi');

gpa = new googleplacesapi({key: secrets.serverKey});

gpa.text({query: 'Big Slice, Toronto'}, function(err, res) {
    if (!err) {
        console.log(res); // Results
        var coords = res.results[0].geometry.location;
        location = (coords.lat || coords.k) + ', ' + (coords.lng || coords.A);
    }
});

gpa.search({name: 'Big Slice, Toronto', location: location}, function(err, res) {
    if (!err) {
        console.log(res); // Results
        bigSlice = res.results[0];
        bigSlice.reference.should.be.ok;
    }
});

gpa.details({placeid: bigSlice.place_id}, function(err, res) {
    if (!err) {
        console.log(res); // Results
    }
});
```


Defaults
--------
These are the application defaults. You can overwrite them during instantiation
of the class or by passing them in the first argument of the search methods.

```
var defaults = {
    key: '',
    sensor: false,
    query: '',
    name: '',
    reference: '',
    radius: 5000, // Defaults to a 5K radius
    types: 'food', // Defaults to food establishments
    location: ('43.653226, -79.3831843'), // Defaults to Toronto
    searchUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    detailsUrl: 'https://maps.googleapis.com/maps/api/place/details/json',
    textUrl: 'https://maps.googleapis.com/maps/api/place/textsearch/json'
}
```

Test
----
`npm test`


Issues
------
https://github.com/ramseydsilva/GooglePlacesClient/issues



[docs]: http://googleplacesapi.ramseydsilva.com
