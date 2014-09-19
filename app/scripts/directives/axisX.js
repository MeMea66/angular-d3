(function(){
    'use strict';

    angular.module('d3.chart')
    .directive('axisX', function() {
        return {
            templateNamespace: 'svg',
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
                        var axisEle = d3.select(element[0]);

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
                        xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient('bottom');
                        d3.select('.x.axis').call(xAxis);

                        $scope.$watch(function() {
                            return chart.getData();
                        }, function(newVal, oldVal) {

                            console.log(d3.extent(
                                   _.chain(newVal)
                                   .values()
                                   .flatten(true)
                                   .pluck($scope.field)
                                   .map(function(val) {return '2014-08-24T' + val})
                                   .value()));

                            xScale.domain(
                                d3.extent(
                                   _.chain(newVal)
                                   .values()
                                   .tap(function(val){console.log(val)})
                                   .flatten(true)
                                   .pluck($scope.field)
                                   .map(function(val) {return new Date('2014-08-24T' + val)})
                                   .value())
                           );

                            axisEle.call(xAxis);
                        }, true);
                    }
                };
            }
        };
    });
})();