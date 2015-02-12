'use strict';

angular.module('app').controller('TournamentsAddCtrl', function ($scope, $modalInstance, tournaments) {
    //Tournament to save, set up defaults now
    $scope.tournaments = tournaments;
    $scope.newItem = {
        lake: '',
        ramp: '',
        date: new Date(),
        start: new Date(),
        end: new Date(),
        directions: ''
    };
    $scope.init = function() {
        $scope.newItem.start.setHours(7);
        $scope.newItem.start.setMinutes(0);
        $scope.newItem.end.setHours(14);
        $scope.newItem.end.setMinutes(0);
    };
    $scope.init();

    //Buttons
    $scope.save = function () {
        $modalInstance.close(addedItem);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    // Calendar properties
        $scope.dateOptions = {
            formatYear: 'yy',
                startingDay: 1
        };
    $scope.dateFormat = 'dd-MMMM-yyyy';

        $scope.datePickers = {
        dtDate: false
    };

        $scope.OpenCalendar = function( $event, calendarName ) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.datePickers[ calendarName ] = true;
        };


});
