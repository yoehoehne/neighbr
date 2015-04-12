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
					
			scope.ChangeRadius = function()
			{
				searchRadius = document.getElementById("radius").value*1609.34;
				if(Math.abs(searchRadius - prevRadius) > 0)
				{
					prevRadius = searchRadius;
					initialize();
					scope.RefreshMe();
				}
			}
			
			scope.CheckCoordinate = function() 
			{
				var watchID = navigator.geolocation.watchPosition(function(position) 
				{
					latitude = position.coords.latitude;
					longitude = position.coords.longitude;
					if(Math.abs(latitude-prevLat) > .0001 || Math.abs(longitude-prevLong) > .0001)//Can play with this threshold value
					{
						prevLat = latitude;
						prevLong = longitude;
						initialize();
					}	
					scope.RefreshMe();
				});
			}
			
			scope.RefreshMe = function()
			{
				var jsonAsText = '{ "radius":' + searchRadius + ',"latitude":' + latitude + ',"longitude":' + longitude + '}';
				var jsonToSend = JSON.parse(jsonAsText);
			
				$(document).ready(function()
				{
					var url = "/api/nearByThreads";
					$.post(url,jsonToSend,function(data) 
					{
						scope.threads = [];
						for(var i = 0; i < data.length; i++)
						{
							scope.threads.push(data[i]);
						}
						scope.$apply();
					});
				});
			}
			

            scope.NewThread = function ()
            {
                var entry = prompt("Enter your post:");
                if (entry != null)
                {
                    var thread = {}
                    thread.firstPost = entry;
                    thread.timestamp = new Date();
                    thread.location = {latitude: latitude, longitude: longitude};
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
