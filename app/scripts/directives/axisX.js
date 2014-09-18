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
            controller: function() {
                console.log('hi');
            },
            require: ['^chart'],
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    post: function postLink($scope, element, attrs, ctrls) {
                        $scope.chart = ctrls[0];

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

                        xScale.range([0, $scope.chart.getWidth()]);
                        console.log(element);
                        d3.select(element[0]).call(d3.svg.axis().scale(xScale).orient("bottom"));
                    }
                };
            }
        };
    });
})();