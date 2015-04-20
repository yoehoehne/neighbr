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

        socket.room = hallway;
        socket.join(socket.room.id);
        socket.user = "anonymous";

        // when the client emits 'adduser', this listens and executes
        socket.on('login', function (user) {
            // store the user in the socket session for this client
            socket.user = user;
        });


        // when the client emits 'sendchat', this listens and executes
        socket.on('commentPosted', function (message) {
            var comment =
            {
                body: message,
                user: socket.user,
                timestamp: new Date(),
                thread: socket.room.id
            }

            mongo_wrapper.addComment(socket.room.id, comment, function(thread){
                io.sockets.in(socket.room.id).emit('updateComments', comment);
            });
        });

        socket.on('switchRoom', function (newroom) {
            mongo_wrapper.readThread(newroom.id, function(err,thread){
                socket.leave(socket.room.id);
                socket.join(newroom.id);
                socket.room = newroom;
                thread.populate('comments', function(err, popthread){
                    socket.emit('roomChanged', popthread); // pass back the current thread
                })
            });
        });




        // when the user disconnects.. perform this
        socket.on('disconnect', function () {
            socket.leave(socket.room.id);
        });
    })

    return io
}