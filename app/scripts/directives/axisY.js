(function(){
    'use strict';

    angular.module('d3.chart')
    .directive('axisY', function() {
        return {
            templateNamespace: 'svg',
            templateUrl: 'templates/axisY.html',
            restrict: 'E',
            replace: true,
            scope: {
                side: '@',
                format: '&',
                ticks: '&',
                data: '='
            },
            require: '^chart',
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    post: function postLink($scope, element, attrs, chart) {
                        chart.setData($scope.side, $scope.data);
                    }
                };
            }
        };
    });
})();