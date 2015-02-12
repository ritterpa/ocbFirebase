'use strict';
angular.module('app').controller('MembersAddCtrl', function ($scope, $firebase, $modalInstance, members) {
    $scope.newMember = {
        fName: '',
        lName: '',
        results: []
    };

    $scope.save = function() {
        $modalInstance.close($scope.newMember);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss();
    };
});