(function(){
    'use strict';

    angular.module('d3.chart')
    .directive('axisX', function() {
        return {
            templateUrl: 'templates/axisX.html',
            restrict: 'E',
            replace: true,
            scope: {
                type: '@',
                field: '@',
                format: '&',
                ticks: '&'
            },
            require: '^chart',
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    post: function postLink($scope, element, attrs, chart) {
                        var xScale;
                        $scope.chart = chart;
                        $scope.type = $scope.type || 'time';
                        //$scope.field = $scope.field || 'time';
                        //$scope.format = $scope.format || 'time';
                        //$scope.ticks = $scope.ticks || 'time';

                        switch($scope.type) {
                            case 'time':
                                xScale =  d3.time.scale();
                                break;
                            default:
                                xScale =  d3.time.scale();
                                break;
                        }
                        console.log(chart.getData());
                        xScale.range([0, $scope.chart.getWidth()]);
                        d3.select(element[0]).call(d3.svg.axis().scale(xScale).orient('bottom'));
                    }
                };
            }
        };
    });
})();