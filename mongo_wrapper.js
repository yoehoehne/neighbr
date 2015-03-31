//This is a Mongo Wrapper for accessing and modifying things from the database
var express = require('express');
var mongoose = require('mongoose');

require('./models/Threads');
require('./models/Users');
require('./models/GPSCoordinate')

var GPSCoordinate = mongoose.model('GPSCoordinate')
var User = mongoose.model('User');
var Thread = mongoose.model('Thread');
var db = mongoose.connect('mongodb://localhost/neighbr');


//CRUD operations for the threads collection:

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

//Read:
var readThreads = function(data, callback)
{
	Thread.find(function(err, data)
	{
		if(err)
			return next(err);
		console.log(data);
		callback(data);	//Return the whole collection...
	})
}

//Update:
var updateThread = function(data, callback)
{
	console.log("Stub.")
}

//Delete:
var deleteThread = function(data, callback)
{
	console.log("Stub.")
}


//CRUD operations for the users collection:
 
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

//Read:
var readUsers = function(callback)
{
	console.log("Read Users was called.");

	User.find(function(err, data)
	{
		if(err)
			return next(err);
		console.log(data);
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

//Delete: Deletes the user associated with this username.
var deleteUser = function(username, data, callback)
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
	})*/