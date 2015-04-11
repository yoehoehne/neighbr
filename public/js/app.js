	angular.module('neighbr', ['btford.socket-io'])
	.controller('Controller', ['$scope','$http','socket', function (scope, $http, socket)
		{
            scope.comment = ''; // model for the text input
            scope.currentThread = null; // the current thread that's being used
			scope.threads = []; // all the threads in this location

			scope.columnBreak = 3;


			scope.startNewRow = function (index, count)
			{
				return ((index) % count) === 0;
			};

			scope.openRoom = function(thread)
			{
                var newroom =
                {
                    id: thread._id
                }

                socket.emit('switchRoom', newroom);
			};

            scope.NewThread = function ()
            {
                var entry = prompt("Enter your post:");
                if (entry != null)
                {
                    var thread = {}
                    thread.firstPost = entry;
                    thread.timestamp = new Date();
                    thread.location = {latitude: 5, longitude: 10}; // TODO: Replace with actual GPS coordinates
                    thread.comments = [];
                    $http.post('/api/thread', thread).
                        success(function(savedThread){
                            console.log(savedThread);
                            scope.threads.push(savedThread);
                        }).
                        error(function(data){
                            console.log(data);
                        })
                }
            }

            scope.SubmitComment = function()
            {
                var comment = scope.comment;
                scope.comment = '';
                socket.emit('commentPosted', comment);
            }


            socket.on('roomChanged', function(thread){
                scope.currentThread = thread;
            })

            socket.on('updateComments', function(comment){
                scope.currentThread.comments.push(comment);
            })
		}])