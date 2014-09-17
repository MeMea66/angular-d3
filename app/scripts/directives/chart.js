(function(){
    'use strict';

    angular.module('d3.chart', [])
        .directive('chart', function() {
            return {
                template: '<div>' +
                    '<svg ng-attr-width={{width}} ng-attr-height={{height}}>' +
                        '<g ng-attr-transform="translate({{margins.top}}, {{margins.left}})">' +
                        '</g>' +
                    '</svg>' +
                '</div>',
                restrict: 'E',
                scope: {
                    width: "@",
                    height: "@",
                    title: "@",

                    margins: "="
                },
                controller: function($scope) {
                    $scope.getWidth = function() {
                        return $scope.width - margins.left - margins.right;
                    }

                    $scope.getHeight = function() {
                        return $scope.height - margins.top - margins.bottom;
                    }
                },
            };
        });
})();