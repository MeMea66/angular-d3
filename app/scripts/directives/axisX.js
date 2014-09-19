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
                        var xAxis;
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
                        xScale.range([0, $scope.chart.getWidth()]);
                        xAxis = d3.svg.axis().scale(xScale).orient('bottom');
                        d3.select(element[0]).call(xAxis);

                        $scope.$watch(function() {
                            return chart.getData();
                        }, function(newVal, oldVal) {
                            xScale.domain( d3.extent(
                                _.chain(newVal)
                                .values()
                                .flatten(true)
                                .pluck($scope.field)
                                .value())
                            );

                            console.log('get');
                            console.log(chart.getData());
                        }, true);
                    }
                };
            }
        };
    });
})();