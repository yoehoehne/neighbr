angular.module('neighbr', ['btford.socket-io'])
    .controller('MainCtrl', [
        '$scope',
        'socket',
        function ($scope, socket) {
            //socket.emit('login', {username: "Joe", location: "cool place"});

            $scope.addComment = function(message)
            {

            }

            $scope.pleasechangeme = function()
            {

            }

            socket.on('roomChanged', function(thread){
                socket.emit('commentPosted', "Emily is hot!");
                console.log(thread);
                console.log("roomChanged event fired");
            })

            socket.on('updateComments', function(user, message){
                console.log("updateComments event fired:");
                socket.emit('switchRoom', "switcheroo");
            })


        }
    ])