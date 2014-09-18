(function(){
    'use strict';

    angular.module('d3.chart', [])
        .directive('chart', function() {
            return {
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
                    this.chartData = {};

                    this.getWidth = function() {
                        return $scope.width - $scope.margins.left - $scope.margins.right;
                    };

                    this.getHeight = function() {
                        return $scope.height - $scope.margins.top - $scope.margins.bottom;
                    };

                    this.setData = function(side, data) {
                        this.chartData[side] = data;
                    }

                    this.getData = function() {
                        return this.chartData;
                    }
                },
            };
        });
})();