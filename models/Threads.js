//This file includes the schema for the Thread model.
/*Each thread needs to have:
	*Location.
	*Array of tuples: {user: "", message: ""}
	*Anything else?
*/

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var threadSchema = new mongoose.Schema(
{
	firstPost: String,
	timestamp: Date,
  location: {type: mongoose.Schema.Types.ObjectId, ref: 'GPSCoordinate'},	//Longitude and Latitude.
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]	//Array of Comment Objects. I don't have a separate class for this because it's only used here.
}, {collection: 'threads'});

threadSchema.method.addComment = function(commentData, callback)
{
    var comment = new Comment(commentData);
    this.comments.push(comment);
    this.save(callback);
}

mongoose.model('Thread', threadSchema);