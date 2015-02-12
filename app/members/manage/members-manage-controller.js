'use strict';
angular.module('app').controller('MembersManageCtrl', function ($scope, $firebase, $modal, members) {
    $scope.members = members;

    $scope.addMember = function($firebase) {
       $modal.open({
            templateUrl: 'members/add/addModal.html',
            controller: 'MembersAddCtrl',
            size: 'lg',
           resolve: {
               members: function() {
                   return $scope.members;
               }
           }
        }).result.then(function(newMember) {
               $scope.members.$add(newMember);
           });
    }
});