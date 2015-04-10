	angular.module('neighbr', [])
	.controller('Controller', ['$scope', function (scope) 
		{
			var text = '{ "threads" : [' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"How is everyone?", "name":"sk8trkd"},' +
								'{"message":"Good, thanks, and you?", "name":"mollyJane"},' +
								'{"message":"Splendiferous", "name":"sk8trkd"},' +
								'{"message":"Has anyone seen my puppy", "name":"Mary-Lou"},' +
								'{"message":"No...and technically speaking, you should have started that in a new message board", "name":"sk8trkd"},' +
								'{"message":"Why?", "name":"Mary-Lou"},' +
								'{"message":"Just to keep things organized", "name":"sk8trkd"},' +
								'{"message":"Yeah, I have your cat, kid, and might give him back for a ransom", "name":"black-van"},' +
								'{"message":"Oh no!", "name":"Mary-Lou"},' +
								'{"message":"We gotta find this loser", "name":"sk8trkd"},' +
								'{"message":"Well he has to be within a three-block radius", "name":"mollyJane"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"How about a test?", "name":"sk8trkd"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"Test again", "name":"sk8trkd"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"So I want one that has a whole lot of text so I can test how well it all fits within the neccesary boundaries. This should push me over the edge and into tomorrow", "name":"Samson McGilligan"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"Just want to make sure everything works right", "name":"sk8trkd"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"See anything good lately?", "name":"sk8trkd"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"Read anything good lately?", "name":"sk8trkd"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"How about a game of go fish?", "name":"sk8trkd"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"Pretty quiet neighborhood", "name":"sk8trkd"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"Seriously, is no one else here?", "name":"sk8trkd"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"*cricket chirps*", "name":"sk8trkd"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"Almost done with these test cases", "name":"sk8trkd"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"One more, you think?", "name":"sk8trkd"}' +
							']' +
						'},' +
						'{ "locationX":52.4, "locationX":60.3, "timestamp":802.11,' +
							' "entries" : [' +
								'{"message":"Yeah, this will be the end", "name":"sk8trkd"}' +
							']' +
						'}' +
					']}';
			var jsonObject = JSON.parse(text);
			
			var threadPreview = '{"threads" : [';
			for(var k = 0; k < (jsonObject.threads.length-1); k++)
			{
				var messageToDisplay = jsonObject.threads[k].entries[0].message;
				if(messageToDisplay.length > 105)
				{
					messageToDisplay = messageToDisplay.substring(0, 102);
					messageToDisplay += '...';
				}
				threadPreview += '{"message":"';
				threadPreview += messageToDisplay;
				threadPreview += '","name":"';
				threadPreview += jsonObject.threads[k].entries[0].name;
				threadPreview += '"},';
			}
			
			var messageToDisplay = jsonObject.threads[jsonObject.threads.length-1].entries[0].message;
			if(messageToDisplay.length > 105)
			{
				messageToDisplay = messageToDisplay.substring(0, 102);
				messageToDisplay += '...';
			}
			threadPreview += '{"message":"';
			threadPreview += messageToDisplay;
			threadPreview += '","name":"';
			threadPreview += jsonObject.threads[k].entries[0].name;
			threadPreview += '"}]}';
			var jsonPreview = JSON.parse(threadPreview);
			scope.items = jsonPreview.threads;
		  
			scope.columnBreak = 3;
		  
			scope.startNewRow = function (index, count) 
			{
				return ((index) % count) === 0;
			};
		  
			scope.openRoom = function(rightID)
			{ 		
				var focusText = "<b>";
				focusText += jsonObject.threads[rightID].entries[0].message
				focusText += "<br> --";
				focusText += jsonObject.threads[rightID].entries[0].name;
				focusText += "</b><ul><br>";
				var index = 1;
				while(index < jsonObject.threads[rightID].entries.length)
				{
					focusText += "<li>";
					focusText += jsonObject.threads[rightID].entries[index].message;
					focusText += "<br>-- ";
					focusText += jsonObject.threads[rightID].entries[index].name;
					focusText += "</li>";
					index++;
				}
				focusText +="</ul>";				
				document.getElementById("focusBoard").innerHTML = focusText;
				//Open room
			};		
		}])
		
		
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