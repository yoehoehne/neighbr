/**
 * Created by josephhoehne on 3/26/15.
 */
var socketio = require('socket.io')

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = [
    {
        id: '550e36db2d0878cd97d4d780',
        title: 'Cool post'
    },
    {
        id: 'ObjectId("550e3693cc4cc2c4973479e6")',
        title: "bobo's cool thing"
    },
    {
        id: 'ObjectId("550e3693cc4cc2c4973479e6")',
        title: "only you"
    }];
//var rooms = ['one', 'two', 'three'];

module.exports.listen = function (app, collection) {
    io = socketio.listen(app)
    io.collection = collection;

    io.sockets.on('connection', function (socket) {
        // when the client emits 'adduser', this listens and executes
        socket.on('adduser', function (username) {
            // store the username in the socket session for this client
            socket.username = username;
            // store the room name in the socket session for this client
            socket.room = rooms[0];
            // add the client's username to the global list
            usernames[username] = username;
            // send client to room 1
            socket.join(socket.room.id);

            // echo to client they've connected
            socket.emit('updatechat', 'SERVER', 'you have connected to '+ socket.room.title);
            // echo to room 1 that a person has connected to their room
            socket.broadcast.to(socket.room.id).emit('updatechat', 'SERVER', username + ' has connected to this room');
            socket.emit('updaterooms', rooms, socket.room);
        });

        // when the client emits 'sendchat', this listens and executes
        //socket.on('sendchat', function (data) {
        //    // we tell the client to execute 'updatechat' with 2 parameters
        //    io.sockets.in(socket.room).emit('updatechat', socket.username, data);
        //    var obj = {
        //        user: socket.username, // username could come with the data even
        //        body: data,
        //        timestamp: new Date()
        //    }
        //
        //
        //    //io.collection.update({_id:socket.room}, {'$push':{comments:obj}}, function(err,results){
        //    //    if (err) throw err;
        //    //    console.log("updated!");
        //    //});
        //    //io.collection.insert(obj, {}, function(e, results){
        //    //    console.log(results);
        //    //    io.sockets.in(socket.room).emit('updatechat', socket.username, results);
        //    //})
        //});


        // when the client emits 'sendchat', this listens and executes
        socket.on('sendchat', function (data) {
            // we tell the client to execute 'updatechat' with 2 parameters
            io.sockets.in(socket.room.id).emit('updatechat', socket.username, data);
            var obj = {
                user: socket.username, // username could come with the data even
                body: data,
                timestamp: new Date()
            }
            io.collection.update({_id: socket.room}, {'$push': {comments: obj}}, function (err, results) {
                if (err) throw err;
                console.log("updated!");
            });
        });

        socket.on('switchRoom', function (newroom) {
            socket.leave(socket.room.id);
            socket.join(newroom.id);
            socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom.title);
            // sent message to OLD room
            socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
            // update socket session room title
            socket.room = newroom;
            socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
            socket.emit('updaterooms', rooms, newroom);
        });


        // when the user disconnects.. perform this
        socket.on('disconnect', function () {
            // remove the username from global usernames list
            delete usernames[socket.username];
            // update list of users in chat, client-side
            io.sockets.emit('updateusers', usernames);
            // echo globally that this client has left
            socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
            socket.leave(socket.room);
        });
    })

    return io
}