var myApp = angular.module('myApp',[]);

myApp.controller('testController', ['$scope', 'parserService', function($scope, parserService) {
  $scope.greeting = 'Hola!';
    parserService.convertToJson('../csv/earthquake.csv')
}]);