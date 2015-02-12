'use strict';

angular.module('app').controller('HomeCtrl', function ($scope, $firebase, $state) {
    console.log('homectrl firing');
    var ref = new Firebase("https://ocb.firebaseio.com/news");
    $scope.news = $firebase(ref).$asArray();
    $scope.selectedItems = [];
    $scope.newItem = {
        headline: 'Test me',
        link: 'www.cnn.com'
    };

    $scope.addNews = function() {
        console.log('here');
        $scope.news.$add($scope.newItem).then(function(news) {
            console.log('news item added');

        });
    };

});