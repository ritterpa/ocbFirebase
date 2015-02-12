'use strict';
angular.module('app').controller('TournamentsListCtrl', function ($scope, $firebase, tournaments) {
    console.log('mem controller');
    //var ref = new Firebase("https://ocb.firebaseio.com/members");
    $scope.tournaments = tournaments;
    $scope.selected = [];

    $scope.gridOptions = {
        items: $scope.tournaments,
        columns: [
            {name: 'Date', field: 'date'},
            {name: 'Lake', field: 'lake'},
            {name: 'Ramp', field: 'ramp'},
            {name: 'Directions', field: 'link', template: '<a ng-href=link>Directions</a>'},
            {name: 'Time', field: 'start', template: '<span>{{item.start}}-{{item.end}}</span>'},
            {name: 'Results', field: '$id', template: '<a ui-sref="results/{{item.$id}}/list">Results</a>'}
        ],
        selectedItems: $scope.selected,
        selectable: true,
        multiSelect: false
    };
});