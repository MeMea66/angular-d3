(function(){
    'use strict';

    angular.module('d3.chart')
    .directive('axisX', ['d3AxisService', function(d3AxisService) {
        return {
            templateNamespace: 'svg',
            templateUrl: 'templates/axisX.html',
            restrict: 'E',
            replace: true,
            scope: {
                label: '@',
                type: '@',
                field: '@',
                format: '@',
                innerTick: '@',
                outerTick: '@',
                side: '@',
                ticks: '&'
            },
            require: '^chart',
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    post: function postLink($scope, element, attrs, chart) {
                        console.log(attrs);
                        var xScale;
                        var xAxis;
                        var axisEle = d3.select(element[0]);

                        $scope.chart = chart;
                        $scope.type = $scope.type || 'time';
                        attrs.side = attrs.side || 'bottom';

                        switch($scope.type) {
                            case 'time':
                                xScale =  d3.time.scale();
                                attrs.format = attrs.format || d3.time.format('%c');
                                break;
                            default:
                                xScale =  d3.time.scale();
                                attrs.format = attrs.format || d3.time.format('%c');
                                break;
                        }

                        var axisSettings = _.compose.apply(null, _.chain(attrs)
                            .reduce(function(result, value, key) {
                                var mutation = d3AxisService.d3AxisOptions(key, value);
                                if(!_.isUndefined(mutation)) {
                                    result.push(mutation);
                                }

                                return result;
                            }, [])
                            .value());

                        xScale.range([0, $scope.chart.getWidth()]);
                        xAxis = axisSettings(d3.svg.axis().scale(xScale));
                        d3.select('.x.axis').call(xAxis);

                        $scope.$watch(function() {
                            return chart.getData();
                        }, function(newVal, oldVal) {
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
    }]);
})();