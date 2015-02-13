'use strict';
angular.module('app').controller('TournamentsManageCtrl', function($scope, $modal, $filter, tournaments) {
    $scope.tournaments = tournaments;

    $scope.newItem = {
        lake: '',
        ramp: '',
        date: $filter('date')(new Date(), 'shortDate'),
        start: new Date(),
        end: new Date(),
        directions: ''
    };

    $scope.modal = {
        title: 'Add Tournament',
        content: '<p>hi</p>'
    };

    $scope.init = function() {
        $scope.newItem.start.setHours(7);
        $scope.newItem.start.setMinutes(0);
        $scope.newItem.end.setHours(14);
        $scope.newItem.end.setMinutes(0);
    };
    $scope.init();

    // Calendar properties
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    //$scope.dateFormat = 'dd-MMMM-yyyy';
    $scope.dateFormat = 'shortDate';

    $scope.datePickers = {
        dtDate: false
    };

    $scope.OpenCalendar = function( $event, calendarName ) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.datePickers[ calendarName ] = true;
    };

    $scope.save = function () {
        $modalInstance.close(addedItem);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

});