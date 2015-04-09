//This is a Mongo Wrapper for accessing and modifying things from the database
var express = require('express');
var mongoose = require('mongoose');

require('./models/Comment')
require('./models/Threads');
require('./models/Users');
require('./models/GPSCoordinate')



var Comment = mongoose.model('Comment');
var GPSCoordinate = mongoose.model('GPSCoordinate')
var User = mongoose.model('User');
var Thread = mongoose.model('Thread');
var db = mongoose.connect('mongodb://localhost/neighbr');


//***********************************************CRUD operations for the threads collection************************************************
//Create: The first argument is a fully created Thread model
var createThread = function(data, callback)
{
	console.log("Inserting new thread into database.")

	var thread = new Thread(data);
	thread.save(function(err, thread)
	{
		if(err)
			callback(err);
		else
			callback(thread);
	});
}

//Will add a comment to the array of comments in the given thread.
var addComment = function(threadID, commentData, callback)
{
	var query = Thread.findOne().where('ObjectID', threadID);
	query.exec(function(err, thread)
	{
		thread.addComment(commentData, function(query)
		{
			console.log("Added this comment to the thread in the array.");
			console.log(thread);
		});
	});

	callback("SUCCESS");
}

//Read: Returns all threads.
var readThreads = function(callback)
{
	Thread.find(function(err, data)
	{
		if(err)
			return next(err);
		//console.log(data);
		callback(data);	//Return the whole collection...
	})
}

//Read: Returns threads within radius of a location
//Needs testing
var readThreadsNearby = function(loc, radius, callback)
{
	var yMax = loc.latitude + radius;
	var yMin = loc.latitude - radius;
	var xMax = loc.longitude + radius;
	var xMin = loc.longitude - radius;

	var query = Thread.find().where('longitude').gt(yMin).lt(yMax).where('latitude').gt(xMin).lt(xMax);
	query.exec(function(err, threads)
	{
		if (err) {
			return err;
		}
		return callback(threads);
	}
}	

var readThread = function(threadID, callback)
{
    Thread.findOne().where({'ObjectID': threadID}, (function(err, thread)
    {
        if(err)
            return next(err);
        //console.log(data);
        callback(thread);
    }));
};

//Update: Query based on the Object ID of the thread, which should be stored in an array in the user.
//Update with the name-value pairs in the array 'data'
var updateThread = function(threadID, data, callback)
{
	var query = Thread.findOne().where('ObjectID', threadID);
	query.exec(function(err, doc)
	{
		var i;
		for(i = 0; i < data.length; i++)
		{
			var tuple = data[i];
			doc.set(data[i].name, data[i].value);		//Test this...
			doc.save(function(err)
			{
				console.log(doc.toJSON());	//Print out the new object that was just saved.
			});
		}
	});

	callback("SUCCESS");
}

//Delete: Delete the thread in the database that is associated with this ID.
var deleteThread = function(threadID, callback)
{
	var query = Thread.findOne().where('ObjectID', threadID);	
	query.exec(function(err, doc)
	{
		doc.remove(function(err, deletedDoc)
		{
			console.log("thread deleted.");
		})
	});

	callback("SUCCESS");
}


//**********************************************CRUD operations for the users collection************************************************
//Create: The first argument is a fully created User model
var createUser = function(data, callback)
{
	console.log("Inserting new user into database.")

	var user = new User(data);
	user.save(function(err, user)
	{
		if(err)
			callback(err);
		else
			callback(user);
	});
}

//Read: Returns all users.
var readUsers = function(callback)
{
	console.log("Read Users was called.");

	User.find(function(err, data)
	{
		if(err)
			return next(err);
		//console.log(data);
		callback(data);	//Return the whole collection...
	})
}

//Update: Finds a user by username, and updates him/her with the changes listed in 'data'
//In this case, it will be easier if data is an array of name=value pairs that list the changes.
var updateUser = function(username, data, callback)
{
	var query = User.findOne().where('username', username);
	query.exec(function(err, doc)
	{
		var i;
		for(i = 0; i < data.length; i++)
		{
			var tuple = data[i];
			doc.set(data[i].name, data[i].value);		//Test this...
			doc.save(function(err)
			{
				console.log(doc.toJSON());	//Print out the new object that was just saved.
			});
		}
	});

	callback("SUCCESS");
}

//Adds a thread to a user array.
var addThread = function(username, threadObjectID)
{
	var query = User.findOne().where('username', username);
	query.exec(function(err, user)
	{
		user.addThread(threadObjectID, function(query)
		{
			console.log("Added this thread to the user in the array.");
			console.log(user);
		});
	});
}

//Removes a specified thread from a user array.
var removeThread = function(username, threadObjectID)
{
	var query = User.findOne().where('username', username);

	query.exec(function(err, user)
	{
		user.removeThread(threadObjectID, function(query)
		{
			console.log("Removed this thread to the user in the array.");
			console.log(user);
		});
	});
}

//Delete: Deletes the user associated with this username.
var deleteUser = function(username, callback)
{
	var query = User.findOne().where('username', username);
	query.exec(function(err, doc)
	{
		doc.remove(function(err, deletedDoc)
		{
			console.log("user deleted.");
		})
	});

	callback("SUCCESS");
}

module.exports.createThread = createThread;
module.exports.readThreads = readThreads;
module.exports.updateThread = updateThread;
module.exports.deleteThread = deleteThread;

module.exports.createUser = createUser;
module.exports.readUsers = readUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;

module.exports.addThread = addThread;
module.exports.removeThread = removeThread;
module.exports.addComment = addComment;

/*
	var testGPS = new GPSCoordinate({longitude: 25.5, latitude: 13.2})
	console.log(testGPS);

	var user = new User({username: "testName2", radius: 1500, googleID: "foobar", location: testGPS})
	user.save(function(err, post)
	{
		if(err)
			console.log("error.")
		else
			console.log("I saved something!")
	})
*/

/*	
	var testGPS = new GPSCoordinate({longitude: 25.5, latitude: 13.2});
	var current = new Date();
	var testThread = new Thread({firstPost: "This is the first post!", timestamp: current, comments: []})
*/
