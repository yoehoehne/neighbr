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
var mongoWrapper = require('./../services/mongo_wrapper')
/******* Routes ************/
/*
 * Get all threads within a given Location
 */
router.post('/api/nearByThreads', function(req, res, next) {
    var radius = req.body.radius;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;    
	
    mongoWrapper.readNearbyThreads(radius, latitude, longitude, function(err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

router.get('/', function(req, res, next) {
    res.render('index');
});

/**
 * Adds a new thread
 */
router.post('/api/thread', function(req, res, next) {
    var thread = new Thread(req.body);
    mongoWrapper.createThread(thread, function(err, result){
        if(err){
            throw err;
        }

        res.json(result);
    });
});

/**
 * Gets all threads in the database
 */
router.get('/threads', function(req, res) {
});


module.exports = router;
