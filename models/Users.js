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
	radius: Number,
	googleID: String,
	//location: Number
	location: {type: mongoose.Schema.Types.ObjectId, ref: 'GPSCoordinate'}	
});

mongoose.model('User', userSchema);