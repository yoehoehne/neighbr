angular.module('neighbr', ['btford.socket-io'])
    .controller('MainCtrl', [
        '$scope',
        'socket',
        function ($scope, socket) {
            $scope.stubbedfunction = function()
            {

            }

            $scope.pleasechangeme = function()
            {

            }


        }
    ])