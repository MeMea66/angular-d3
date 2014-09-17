(function(){
    'use strict';

    angular.module('d3.chart')
    .directive('xAxis', ['', function() {
        return {
            template: '<div></div>',
            restrict: 'E',
            scope: {
                type: "@",
                field: "@",
                format: "&",
                ticks: "&"
            },
            controller: function($scope) {
            },
            require: ['^chart', 'y-axis']
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    post: function postLink($scope, element, attrs, chart) {
                        $scope.type = $scope.type || 'time';
                        //$scope.field = $scope.field || 'time';
                        //$scope.format = $scope.format || 'time';
                        //$scope.ticks = $scope.ticks || 'time';

                        switch($scope.type) {
                            case 'time':
                                var xScale =  d3.time.scale();
                                break;
                            default:
                                var xScale =  d3.time.scale();
                                break;
                        }

                        xScale.range([0, chart.getWidth()]);
                        var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
                    }
                }
            }
        };
    });
});