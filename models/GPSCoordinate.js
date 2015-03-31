//GPS Coordinate model.
var mongoose = require('mongoose');

var GPSSchema = new mongoose.Schema(
{
	latitude: Number,
	longitude: Number
	//quadrant: int
});

mongoose.model('GPSCoordinate', GPSSchema);