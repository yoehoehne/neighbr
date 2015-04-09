var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/Comment')
require('../models/Threads');
require('../models/Users');
require('../models/GPSCoordinate')
var GPSCoordinate = mongoose.model('GPSCoordinate');
var Thread = mongoose.model('Thread');
var User = mongoose.model('User');
var path = require('path');

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
 */
router.post('/threads', function(req, res, next) {
    var thread = new Thread(req.params[0], new Date().toJSON(), req.params[1], req.params[2], []);
    thread.save(function(err, thread) {
        if (err) {
            return next(err);
        }
        res.json(thread);
    });
});

/*
 * Get all threads within a given Location
 */
router.get('/api/threads/', function(req, res) {
    var radius = req.params[0];
    var latitude = req.params[1];
    var longitude = req.params[2];    

    mongoWrapper.readNearbyThreads(radius, latitude, longitude, null);
});

router.get('/', function(req, res, next) {
    res.render('index');
});

/**
 * Adds a new thread
 */
router.post('/api/thread', function(req, res, next) {
    var thread = new Thread(req.params[0], new Date().toJSON(), req.params[1], req.params[2], []);
    mongoWrapper.createThread(thread);  
});

/**
 * Gets all threads in the database
 */
router.get('/threads', function(req, res) {
});


module.exports = router;