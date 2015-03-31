//This file includes the schema for the Thread model.
/*Each thread needs to have:
	*Location.
	*Array of tuples: {user: "", message: ""}
	*Anything else?
*/

var mongoose = require('mongoose');
var threadSchema = new mongoose.Schema(
{
	firstPost: String,
	timestamp: Date,
  	location: {type: mongoose.Schema.Types.ObjectId, ref: 'GPSCoordinate'},	//Longitude and Latitude.
  	comments: [{
  				user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  				comment: String,
  				timestamp: Date,
  				//thread: {type: mongoose.Schema.Types.ObjectID, ref: 'Thread'}	//Will this line cause any problems?
  			  }]	//Array of Comment Objects. I don't have a separate class for this because it's only used here.
}, {collection: 'threads'});

mongoose.model('Thread', threadSchema);