/**
 * Created by josephhoehne on 4/7/15.
 */
var assert = require("assert")
var wrapper = require('./../mongo_wrapper');

var coordinate = {
    latitude: 11.578,
    longitude: -200.12
}

var thread = {
    firstPost: "My First Little Post",
    timestamp: new Date(),
    location: coordinate,	//Longitude and Latitude.
    comments: []
}

describe('Thread', function(){
    describe('#createThread()', function() {
        it('should save a new thread into the database without errors', function () {
            wrapper.createThread(thread, function (data) {
                var t = data.doc;
                assert.equal(thread.firstPost, t.firstPost);
                assert.equal(thread.timestamp, t.timestamp);
                assert.equal(thread.coordinate, t.coordinate);
            });

        });
    });
});


