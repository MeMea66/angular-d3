'use strict';

/**
 * @ngdoc function
 * @name angularD3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularD3App
 */
angular.module('angularD3App')
    .controller('mainCtrl', ['$scope', 'parserService', function ($scope, parserService) {
        $scope.margins = {
            top: 50,
            left: 50,
            right: 50,
            bottom: 50
        };

        parserService.convertToJson('csv/earthquake.csv').then(function(result) {
            $scope.data = result;
            console.log($scope.data);
        });
    }]);
