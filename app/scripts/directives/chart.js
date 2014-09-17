(function(){
  'use strict';

  angular.module('d3.chart')
      .directive('chart', ['', function() {
          return {
              template: '<div></div>',
              restrict: 'E',
              scope: {
                  chartWidth: "@width",
                  chartHeight: "@height",
                  title: "@"
              },
              controller: function($scope) {

              },
              require: 'siblingDirectiveName',
              compile: function compile(tElement, tAttrs, transclude) {
                return {
                  pre: function preLink(scope, iElement, iAttrs, controller) { ... },
                  post: function postLink(scope, iElement, iAttrs, controller) { ... }
                }
            }
          };
      });
});