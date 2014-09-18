'use strict';

/**
 * @ngdoc function
 * @name angularD3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularD3App
 */
angular.module('angularD3App')
    .controller('MainCtrl', function ($scope) {
        $scope.margins = {
            top: 50,
            left: 50,
            right: 50,
            bottom: 50
        };
    });
