'use strict';

/**
 * @file Node.js library to query Google Places API.
 * Also see {@link https://github.com/ramseydsilva/googleplacesapi github}
 * @author Ramsey D'silva <ramseydsilva@gmail.com>
 * @version 0.0.1
 */

var request = require('request'),
    xtend = require('xtend');

/**
 * @default defaults Specify the defaults
 */
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
};

/**
 * Provides access to Google Places API
 * @constructor Constructs a new GooglePlaces class from defaults and options
 * @param {Object} options Google API key
 */
var GooglePlaces = function(options) {
    this.defaults = xtend(defaults, options);
};

/**
 * @method request Sends a request to the specified url
 * @param {String} url The url where the request needs to be sent
 * @param {Object} qs Query parameters to be sent with this request
 * @param {GooglePlaces~requestCallback} callback
 */
GooglePlaces.prototype.request = function(url, qs, callback) {
    request.get(url, {
        qs: qs,
        json: true
    }, function(err, res, json) {
        if (!err && json.status == "OK") {
            callback(null, json);
        } else {
            callback(new Error("Non ok status returned"), null);
        }
    });
};

/**
 * @method text Performs google places text search
 * @param {Object} options Override GooglePlaces defaults with options for this query
 * @param {GooglePlaces~requestCallback} callback
 */
GooglePlaces.prototype.text = function(options, callback) {
    this.defaults = xtend(this.defaults, options);
    var qs = {
        query: this.defaults.query,
        sensor: this.defaults.sensor,
        key: this.defaults.key
    }
    this.request(this.defaults.textUrl, qs, callback);
},

/**
 * @method search Performs google places basic search
 * @param {Object} options Override GooglePlaces defaults with options for this query
 * @param {GooglePlaces~requestCallback} callback
 */
GooglePlaces.prototype.search = function(options, callback) {
    this.defaults = xtend(this.defaults, options);
    var qs = {
        location: this.defaults.location,
        radius: this.defaults.radius,
        types: this.defaults.types,
        name: this.defaults.name || this.defaults.query,
        sensor: this.defaults.sensor,
        key: this.defaults.key
    }
    this.request(this.defaults.searchUrl, qs, callback);
},

/**
 * @method details Performs google places detail search
 * @param {Object} options Override GooglePlaces defaults with options for this query
 * @param {GooglePlaces~requestCallback} callback
 */
GooglePlaces.prototype.details = function(options, callback) {
    this.defaults = xtend(this.defaults, options);
    var qs = {
        reference: this.defaults.reference,
        sensor: this.defaults.sensor,
        key: this.defaults.key
    }
    this.request(this.defaults.detailsUrl, qs, callback);
}

/**
 * @callback requestCallback callback that returns the API query
 * @param {Error} Any error occured during request
 * @param {Array} Array of results returned
 */

module.exports = GooglePlaces
