'use strict';
angular.module('app').controller('MembersListCtrl', function ($scope, $firebase, members) {
    console.log('mem controller');
    $scope.members = members;
    $scope.data = $firebase(new Firebase('https://ocb.firebaseio.com/Year/2015/members')).$asArray();
    console.log($scope.data);
    $scope.selectedMembers = [];

    $scope.gridOptions = {
        items: $scope.members,
        columns: [
            {name: 'First Name', field: 'fName'},
            {name: 'Last Name', field: 'lName'},
            {name: 'Total Weight', field: 'weight'},
            {name: 'Total Fish', field: 'numFish'}
        ],
        selectedItems: $scope.selectedMembers,
        selectable: true,
        multiSelect: false
    };


    $scope.init = function() {
        console.log('init called');
        console.log($scope.data);
        //$scope.data[0].weight = 0;
        angular.forEach($scope.members, function(item) {
            console.log('test');
            console.log(item);
            item.weight = 0;
            item.numFish = 0;
            _.forEach(item.results, function(result) {
                item.weight+= result.weight;
                item.numFish+= result.numFish;
            });
        });
    };
    $scope.init();
});