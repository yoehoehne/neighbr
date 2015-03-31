/**
 * Created by josephhoehne on 3/24/15.
 */
var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
    body: String,
    // user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

mongoose.model('Comment', CommentSchema);