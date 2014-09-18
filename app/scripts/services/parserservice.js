'use strict';

var module = angular.module('angularD3App', []);

module.service('parserService', function($rootScope) {
    this.convertToJson = function(file_location) {
        d3.csv(file_location, function(data)
        {
            //console.log(data);
            $rootScope.$broadcast('csvConverted', data);
        });
    };
});

