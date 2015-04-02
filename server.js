var https = require('https');
var http = require('http');
var fs = require('fs');
var express = require('express')
var bodyParser = require('body-parser');
var mongoskin = require('mongoskin')
var app = express();
var server = http.createServer(app)


app.use(bodyParser.json());
server.listen(8080);

var dbURL = "mongodb://localhost/neighbr";
var db = mongoskin.db(dbURL, {safe:true});
var collections = ['threads', 'users'];
var io = require('./sockets').listen(server);

app.param('collectionName', function(req, res, next, collectionName){
    if(collections.indexOf(collectionName) == -1)
    {
        res.writeHead(404);
        res.end();
    }
    req.collection = db.collection(collectionName);
    return next();
});

/***** Routes *******************/
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index.html')
});

app.use('/', express.static('./html', {
    maxAge: 60 * 60 * 1000
}));


/**
 * Gets threads based on given Location
 */
app.post('/api/:collectionName', function(req,res){
    var location = req.body;

});

/**
 * Adds a new thread
 */
app.post('/api/new/:collectionName', function(req, res) {
    req.collection.insert(req.body, {}, function(e, results){
        if (e) return next(e)
        res.send(results)
    })
})

/**
 * Gets all threads in the db
 */
app.get('/api/:collectionName', function(req, res) {
    req.collection.find().toArray(function(e, results){
        if (e) return next(e)
        res.send(results)
    })
})


//********* Socket.io ************

