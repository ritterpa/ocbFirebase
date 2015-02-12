angular.module('app').controller('YearListCtrl', function($scope, $firebase, events) {
    $scope.events = events;
    console.log('year controller');
    console.log($scope.events);

});