//This is the user model.
/* Users include:
	*Location: GPSCoordinate
	*username: String
	*radius: int
	*googleID: String
*/

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema(
{
	username: String,
	logginIn: Boolean,	//Could potentially just be part of the model in the server?
	radius: Number,
	googleID: String,
	//location: Number
	location: {type: mongoose.Schema.Types.ObjectId, ref: 'GPSCoordinate'},	
	threads: [mongoose.Schema.Types.ObjectId]	//Uses an Object ID.
});

userSchema.methods.addThread = function(toPush, callback)
{
	this.threads.push(toPush);
	this.save(callback);
}

userSchema.methods.removeThread = function(threadID, callback)
{
	var index = this.threads.indexOf(threadID);
	if(index > -1)
		this.threads.splice(index, 1);	//Removes just the one element in the array.
	console.log(this.threads);
	this.save(callback);
}


mongoose.model('User', userSchema);