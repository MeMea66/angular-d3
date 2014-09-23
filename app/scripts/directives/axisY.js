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
                        $scope.chart = chart;
                        $scope.chartData = chart.getData();
                        $scope.chartData[attrs.side] = $scope.data;

                        var yAxis;
                        var axisEle = d3.select(element[0]);

                        attrs.side = $scope.side = attrs.side || 'left';

                        $scope.yScale = chart.getScale()['y'][attrs.side] = d3.scale.linear();
                        $scope.chartData[attrs.side] = $scope.data;

                        var axisSettings = _.compose.apply(null, _.chain(attrs)
                            .reduce(function(result, value, key) {
                                var mutation = d3AxisService.d3AxisOptions(key, value);
                                if(!_.isUndefined(mutation)) {
                                    result.push(mutation);
                                }

                                return result;
                            }, [])
                            .value());

                        $scope.yScale.range([0, $scope.chart.getHeight()]);
                        yAxis = axisSettings(d3.svg.axis().scale($scope.yScale));
                        d3.select('.y.axis.' + $scope.side).call(yAxis);

                        $scope.$watch(function() {
                            return [$scope.data, chart.getFields()[attrs.side]];
                        }, function(newVal, oldVal) {
                            $scope.chartData[attrs.side] = newVal[0];

                            $scope.yScale.domain(
                                d3.extent(
                                   _.chain(newVal[1])
                                       .map(function(val){
                                           return _.pluck(newVal[0], val);
                                       })
                                   .flatten(true)
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