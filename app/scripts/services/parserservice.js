'use strict';

angular.module('d3.chart.services')
    .service('parserService', ['$q', function($q) {
        this.convertToJson = function(file_location) {
            var defer = $q.defer();

            d3.csv(file_location, function(data) {
                defer.resolve(data);
            });

            return defer.promise;
        };
    }]);

