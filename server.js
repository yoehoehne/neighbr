var https = require('https');
var http = require('http');
var fs = require('fs');
var express = require('express')
var bodyParser = require('body-parser');
var wrapper = require('./mongo_wrapper');
var app = express();
app.use(bodyParser.json());



//Server listens to port 80 for HTTP connections.
var server = app.listen(80, function () 
{

    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port)

});

/*app.param('collectionName', function(req, res, next, collectionName){

    console.log("Entered the param part.");
    wrapper.setCollection(collectionName, function(err, body)
    {
        console.log("Callback function was called.");
        if(err)
        {
            res.writeHead(404);
            res.end();
            return; //Don't do anything else.
        }

        //db.collection(collectionName)
        console.log(body);
        req.collection = body;
        return next();
    });
});*/

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

var username = "";
app.param('username', function(req, res, next, name)
{
    username = name.substring(1);
    console.log("Param called...")
    next();
})

var mongoose = require('mongoose');
require('./models/Threads');
require('./models/Users');
require('./models/GPSCoordinate')
var GPSCoordinate = mongoose.model('GPSCoordinate')
var User = mongoose.model('User');
var Thread = mongoose.model('Thread');


//In real life this would be a get, but this is for testing.. the browser can quickly make a GET call...
app.get('/api/delete/thread', function(req, res)
{
    wrapper.readThreads(function(data)
    {
        console.log("Executing REMOVE after reading data....")
        var i = 0;
        for (i = 0; i < data.length; i++)
        {
            console.log(data[i])
            console.log(data[i]._id)
        }    

        wrapper.removeThread('testName2', data[0]._id)
    })
})

app.get('/api/create/thread', function(req, res)
{
    //var testGPS = new GPSCoordinate({longitude: 25.5, latitude: 13.2});
    //var current = new Date();
    //var testThread = new Thread({firstPost: "This is the first post!", timestamp: current, comments: []});

    /*wrapper.createThread(testThread, function()
    {
        console.log("Finished creating this thread!")
    })*/



    //Put this thread into our array of user testName2...
    wrapper.readThreads(function(data)
    {
        console.log("Executing ADD after reading data....")
        var i = 0;
        for (i = 0; i < data.length; i++)
        {
            console.log(data[i])
            console.log(data[i]._id)
        }    


        wrapper.addThread('testName2', data[0]._id)
    })
    //console.log('testThread: ' + testThread)
    //wrapper.addThread('testName2', testThread.ObjectID)...
})


/**
 * Modifies a user.
 */
 app.put('/api/update/:username', function(req, res) 
 {
    //username = "testName"
    console.log("updating user: " + username);
    var changes = [];
    changes.push({name: 'radius', value: '2500'})
    wrapper.updateUser(username, changes, function(data)
    {
        console.log(data);
        console.log("post was successful!")
    })    
 })

//Testing function to make sure the wrapper deletes the user.
app.put('/api/delete/:username', function(req, res)
{
    console.log("Deleting user: " + username);
    wrapper.deleteUser(username, function(info)
    {
        console.log(info)
        console.log("Deleted the user....")
    })
})


/**
 * Gets an array of all the threads in the db.
 */
app.get('/api/threads', function(req, res)
{
    wrapper.readThreads(function(data)
    {
        console.log("SUCCESS");
        res.writeHead(200);
        res.end(JSON.stringify(data));
    })
})



/**
 * Gets all users in the db
 */
 app.get('/api/users', function(req, res) 
 {
    console.log("Get was called.... (Tanis)")
    console.log(req.body);

    wrapper.readUsers(function(data)
    {
        console.log("SUCCESS");
        res.writeHead(200);
        res.end(JSON.stringify(data));
    })
})