'use strict';

var googleplacesapi = require('../lib'),
    secrets = require('./secrets'), // Specify your own
    should = require('should');

describe('Google API', function(done) {

    var gpa, location, bigSlice;

    before(function() {
        gpa = new googleplacesapi({key: secrets.serverKey});
    });

    it('returns value for text search', function(done) {
        gpa.text({query: 'Big Slice, Toronto'}, function(err, res) {
            if (!err) {
                res.results.length.should.be.ok;
                var coords = res.results[0].geometry.location;
                location = (coords.lat || coords.k) + ', ' + (coords.lng || coords.A);
            }
            done(err);
        });
    });

     it('returns value for basic search', function(done) {
        gpa.search({name: 'Big Slice, Toronto', location: location}, function(err, res) {
            res.results.length.should.be.ok;
            if (!err) {
                bigSlice = res.results[0];
                bigSlice.reference.should.be.ok;
            }
            done(err);
        });
    });

    it('returns value for detail search', function(done) {
        gpa.details({reference: bigSlice.reference}, function(err, res) {
            if (!err) {
                res.result.should.be.ok;
            }
            done(err);
        });
    });

    it('No results if no key specified', function(done) {
        gpa.text({query: 'Big Slice, Toronto', key: ''}, function(err, res) {
            err.should.be.error;
            done();
        });
    });

});
