var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var GPSCoordinate = mongoose.model('GPSCoordinate');
var Thread = mongoose.model('Thread');
var User = mongoose.model('User');

/******* Routes ************/
/*
 * Get all threads within a given Location
 */
router.get('/threads/:location', function(req, res) {
    var latitude = req.params[0];
    var longitude = req.params[1];    
     //Thread.find(function(err, 
});

/**
 * Adds a new thread
 */]
router.post('/threads', function(req, res, next) {
    var thread = new Thread(req.params[0], new Date().toJSON(), req.params[1], req.params[2], []);
    thread.save(function(err, thread) {
        if (err) {
            return next(err);
        }
        res.json(thread);
    });
});
