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
 * Specify the defaults
 * @default defaults
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
 * Constructs a new class that provides access to Google Places API
 * @constructor GooglePlaces
 * @param {Object} options Google API key
 */
var GooglePlaces = function(options) {
    this.defaults = xtend(defaults, options);
};

/**
 * Sends a request to the specified url
 * @method request
 * @param {String} url The url where the request needs to be sent
 * @param {Object} qs Query parameters to be sent with this request
 * @param {GooglePlaces~requestCallback} callback
 */
GooglePlaces.prototype.request = function(url, qs, callback) {
    request.get(url, {
        qs: qs,
        json: true
    }, function(err, res, json) {
        if (err) {
            callback(err, null);
        } else {
            if (json.status == "OK" || json.status == "ZERO_RESULTS") {
                callback(null, json);
            } else {
                callback(json, null);
            }
        }
    });
};

/**
 * Performs google places text search
 * @method text
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
 * Performs google places basic search
 * @method search
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
 * Performs google places detail search
 * @method details
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
