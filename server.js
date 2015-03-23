var https = require('https');
var http = require('http');
var fs = require('fs');
var express = require('express')
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
app.use(bodyParser.json());

var dbURL = "mongodb://localhost/neighbr";

var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});

/***** Routes *******************/
app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.use('/', express.static('./html', {
    maxAge: 60 * 60 * 1000
}));

app.post('/api/newThread', function (req, res) {
    var thread;
    thread = req.body;
    addThread(thread, res);
});

app.post('/api/getThreads', function(req,res){
    var location = req.body;

});

app.get('/api/getThreads', function(req,res){
    MongoClient.connect(dbURL, function(err,db){
        db.collection('threads').find(function(err,values){
            res.writeHead(200);
            res.end(values)
        })
    })
})



/*********** Other Functions ********************/

var addThread = function(obj, res)
{
    addToDB('threads', obj, res);
}


var addToDB = function (collection, obj, res) {
    MongoClient.connect(dbURL, function (err, db) {
        if (err) { throw err; }

        db.collection(collection).insert(obj, function (err, records) {
            if (err) { throw err; }
            console.log("added "+obj);
            res.writeHead(200);
            res.end();
        });
    });
}