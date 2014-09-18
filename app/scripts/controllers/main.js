'use strict';

/**
 * @ngdoc function
 * @name angularD3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularD3App
 */
angular.module('angularD3App')
    .controller('MainCtrl', ['$scope', 'parserService', function ($scope, parserService) {
        $scope.margins = {
            top: 50,
            left: 50,
            right: 50,
            bottom: 50
        };
        parserService.convertToJson('csv/earthquake.csv');

        $scope.$on('csvConverted', function(event, args) {
            $scope.$apply(function() {
                $scope.data = args;
            });
            console.log($scope.data[0]);
        });
    }]);
