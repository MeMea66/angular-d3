'use strict';

angular.module('angularD3App')
    .service('parserService', ['$q', function($q) {
        this.convertToJson = function(file_location) {
            var defer = $q.defer();

            d3.csv(file_location, function(data) {
                defer.resolve(data);
            });

            return defer.promise;
        };
    }]);

