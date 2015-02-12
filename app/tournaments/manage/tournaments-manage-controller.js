'use strict';
angular.module('app').controller('TournamentsManageCtrl', function($scope, $modal, tournaments) {
    $scope.tournaments = tournaments;

    $scope.add = function() {
        $modal.open({
            templateUrl: 'tournaments/add/add.html',
            controller: 'TournamentsAddCtrl',
            size: 'lg',
            resolve: {
                tournaments: function() {
                    return $scope.tournaments;
                }
            }
        }).result.then(function(newTournament) {
                $scope.tournaments.$add(newTournament);
            });
    };

});