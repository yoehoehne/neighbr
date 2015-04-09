/**
 * Created by josephhoehne on 4/7/15.
 */
var assert = require("assert")
var wrapper = require('./../mongo_wrapper');
var mongoose = require('mongoose');

var coordinate = {
    latitude: 11.578,
    longitude: -200.12
}

var thread = {
    firstPost: "My First Little Post 2",
    timestamp: new Date(),
    location: coordinate,	//Longitude and Latitude.
    comments: []
}



wrapper.createThread(thread, function (data) {
    var t = data._doc;
    wrapper.readThread(t._id.id, function (err, data2) {
        if (err) {
            console.log(err);
        }

        var t2 = data2._doc;
        console.log("done!")
        console.log(t2);
    })
})



//describe('Thread', function(){
//
//    //describe('#createThread()', function() {
//    //
//    //    it('should save a new thread into the database without errors', function () {
//    //        wrapper.createThread(thread, function (data) {
//    //            var t = data.doc;
//    //            assert.equal(thread.firstPost, t.firstPost);
//    //            assert.equal(thread.timestamp, t.timestamp);
//    //            assert.equal(thread.coordinate, t.coordinate);
//    //            done(); // need to call done because its async
//    //        });
//    //    });
//    //});
//
//
//    describe('#readThread()', function() {
//        it('should retrieve a thread from the database', function () {
//            console.log("it gets out")
//            mongoose.model('Thread').findOne().where({'ObjectID': "5525f2ba4a68553c0a9d8f91"}, function(err, data){
//                if(err){
//                    done(err)
//                }
//
//                console.log("got here")
//                done();
//            });
//        });
//    });
//
//
//    //describe('#readThread()', function() {
//    //    it('should retrieve a thread from the database', function () {
//    //        wrapper.createThread(thread, function (data) {
//    //            var t = data.doc;
//    //            assert.fail();
//    //            wrapper.readThread(t._id, function(err, data2){
//    //                if(err){
//    //                    done(err);
//    //                }
//    //
//    //                var t2 = data2.doc;
//    //                assert.equal(t.firstPost, t2.firstPost)
//    //                assert.equal(t._id, t2._id);
//    //                console.log("done!")
//    //                done();
//    //            })
//    //        });
//    //    });
//    //});
//
//
//});


