/**
 * Created by josephhoehne on 3/26/15.
 */
var socketio = require('socket.io');
var mongo_wrapper = require('./mongo_wrapper');
var hallway = "hallway"
hallway.id = 0;

module.exports.listen = function (app) {
    io = socketio.listen(app);


    io.sockets.on('connection', function (socket) {
        // when the client emits 'adduser', this listens and executes
        socket.on('login', function (user) {
            // store the user in the socket session for this client
            socket.user = user;
            // store the room name in the socket session for this client
            socket.room = hallway;

            // join the hallway
            socket.join(socket.room.id);
            socket.emit('roomChanged', {post: "Thread here", location : "better place"})
        });


        // when the client emits 'sendchat', this listens and executes
        socket.on('commentPosted', function (message) {

            console.log("commentPosted event fired")
            io.sockets.in(socket.room.id).emit('updateComments', socket.user, message);


            //var comment = {
            //    user: socket.user,
            //    body: message,
            //    timestamp: new Date()
            //}
            //
            //
            //mongo_wrapper.addComment(socket.room, comment);
            //io.collection.update({_id: socket.room}, {'$push': {comments: comment}}, function (err, results) {
            //    if (err) throw err;
            //    console.log("updated!");
            //});
        });

        socket.on('switchRoom', function (newroom) {
            console.log("switchRoom event fired")
            //mongo_wrapper.readThread(newroom.id, function(thread){
            //    socket.leave(socket.room.id);
            //    socket.join(newroom.id);
            //    socket.room = newroom;
            //    socket.emit('roomChanged', thread); // pass back the current thread
            //});
        });




        // when the user disconnects.. perform this
        socket.on('disconnect', function () {
            socket.leave(socket.room.id);
        });
    })

    return io
}