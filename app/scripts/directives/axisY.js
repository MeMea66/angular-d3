(function(){
    'use strict';

    angular.module('d3.chart')
    .directive('axisY', ['d3AxisService', function(d3AxisService) {
        return {
            templateNamespace: 'svg',
            templateUrl: 'templates/axisY.html',
            restrict: 'E',
            replace: true,
            scope: {
                label: '@',
                side: '@',
                format: '@',
                innerTick: '@',
                outerTick: '@',
                orientation: '@',
                ticks: '&',
                data: '='
            },
            require: '^chart',
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    post: function postLink($scope, element, attrs, chart) {
                        chart.setData($scope.side, $scope.data);

                        var yScale = d3.scale.linear();
                        var yAxis;
                        var axisEle = d3.select(element[0]);

                        $scope.chart = chart;
                        attrs.side = $scope.side = attrs.side || 'left';

                        var axisSettings = _.compose.apply(null, _.chain(attrs)
                            .reduce(function(result, value, key) {
                                var mutation = d3AxisService.d3AxisOptions(key, value);
                                if(!_.isUndefined(mutation)) {
                                    result.push(mutation);
                                }

                                return result;
                            }, [])
                            .value());

                        yScale.range([0, $scope.chart.getWidth()]);
                        yAxis = axisSettings(d3.svg.axis().scale(yScale));
                        d3.select('.y.axis.' + $scope.side).call(yAxis);

                        $scope.$watch('data', function(newVal, oldVal) {
                            yScale.domain(
                                d3.extent(
                                   _.chain(newVal)
                                   .values()
                                   .flatten(true)
                                   .pluck($scope.field)
                                   .map(function(val) {return new Date('2014-08-24T' + val)})
                                   .value())
                           );

                            axisEle.call(yAxis);
                        }, true);
                    }
                };
            }
        };
    }]);
})();