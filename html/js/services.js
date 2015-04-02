/**
 * Created by josephhoehne on 3/31/15.
 */

angular.module('neighbr')
    .factory('socket', ['socketFactory',
        function (socketFactory) {
            return socketFactory();
        }
    ])