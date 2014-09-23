(function(){
    'use strict';

    angular.module('d3.chart', ['d3.chart.services'])
        .directive('chart', function() {
            return {
                templateNamespace: 'svg',
                transclude: true,
                templateUrl: 'templates/chart.html',
                restrict: 'E',
                scope: {
                    width: '@',
                    height: '@',
                    title: '@',

                    margins: '='
                },
                controller: function($scope) {
                    $scope.scale = {
                        y: {},
                        x: {}
                    };
                    $scope.data = {};
                    $scope.fields = {};

                    this.getWidth = function() {
                        return $scope.width - $scope.margins.left - $scope.margins.right;
                    };

                    this.getHeight = function() {
                        return $scope.height - $scope.margins.top - $scope.margins.bottom;
                    };

                    this.getData = function() {
                        return $scope.data;
                    }

                    this.getScale = function() {
                        return $scope.scale;
                    }

                    this.getFields = function() {
                        return $scope.fields;
                    }

                    $scope.$watch('scale', function(newVal, oldVal) {
                        console.log(newVal);
                    }, true);

                    $scope.$watch('data', function(newVal, oldVal) {
                        console.log(newVal);
                    }, true);
                },
            };
        });
})();