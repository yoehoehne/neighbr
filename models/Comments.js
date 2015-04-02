/**
 * Created by josephhoehne on 3/24/15.
 */
var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
    body: String,
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //TODO: change to use the User model
    timestamp: Date
});

mongoose.model('Comment', CommentSchema);