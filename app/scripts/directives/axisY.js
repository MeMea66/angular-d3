(function(){
    'use strict';

    angular.module('d3.chart')
    .directive('axisY', function() {
        return {
            templateUrl: 'templates/axisY.html',
            restrict: 'E',
            replace: true,
            scope: {
                side: '@',
                format: '&',
                ticks: '&',
                //data: '='
            },
            require: '^chart',
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    post: function postLink($scope, element, attrs, chart) {
                        $scope.data = [1,2,3,4];

                        $scope.$watch('data', function(newVal, oldVal) {
                            console.log('set');
                            chart.setData($scope.side, newVal);
                        }, true);

                        setTimeout(function() {
                            $scope.$apply( function() {
                                $scope.data = [5,6,7,8];
                            })
                        })
                    }
                };
            }
        };
    });
})();