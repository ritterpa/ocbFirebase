/**
 * Created by Paul on 1/20/2015.
 */
'use strict';

angular.module('app', ['ui.router',
                        'ui.bootstrap',
                        'firebase',
                        'pascalprecht.translate',
                        'LocalStorageModule',
                        'toaster',
                        'mgcrea.ngStrap'])



    .run(function ($rootScope, $state) {
        console.log('App Run');
    })

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider, $provide) {
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/');

        $translateProvider.useStaticFilesLoader({
            prefix: 'lang/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en_US');
        $translateProvider.fallbackLanguage('en_US');

        //reference the controllername within each controller
        //$provide.decorator('$controller', [
        //    '$delegate',
        //    function ($delegate) {
        //        return function (constructor, locals) {
        //            console.log('constructor');
        //            console.log(constructor);
        //            if (typeof constructor === 'string') {
        //                console.log('here 2');
        //                locals.$scope.controllerName = constructor;
        //            }
        //            console.log('here 3');
        //            return $delegate(constructor, locals);
        //        };
        //    }
        //]);


        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl',
                resolve: {}
            })
            .state('members', {
                url: '/members',
                abstract: true,
                template: '<div ui-view></div>'
            })
            .state('members.list', {
                url: '',
                templateUrl: 'members/list/list.html',
                controller: 'MembersListCtrl',
                resolve: {
                    members: function(ocbFbService) {
                        return ocbFbService.data('members').$asArray();
                    }
                }
            })
            .state('members.manage', {
                url: '/manage',
                views: {
                    '': {
                        templateUrl: 'members/manage/manage.html',
                        controller: 'MembersManageCtrl',
                        resolve: {
                            members: function (ocbFbService) {
                                return ocbFbService.data('members').$asArray();
                            }
                        }
                    },
                    'members@members.manage': {
                        templateUrl: 'members/list/list.html',
                        controller: 'MembersListCtrl',
                        resolve: {
                            members: function (ocbFbService) {
                                return ocbFbService.data('members').$asArray();
                            }
                        }
                    }
                }
            })

            .state('tournaments', {
                url: '/tournaments',
                abstract: true,
                template: '<div ui-view></div>'
            })
            .state('tournaments.list', {
                url: '',
                templateUrl: 'tournaments/list/list.html',
                controller: 'TournamentsListCtrl',
                resolve: {
                    tournaments: function(ocbFbService) {
                        return ocbFbService.data('tournaments').$asArray();
                    }
                }
            })
            .state('tournaments.manage', {
                url: '/manage',
                views: {
                    '': {
                        templateUrl: 'tournaments/manage/manage.html',
                        controller: 'TournamentsManageCtrl',
                        resolve: {
                            tournaments: function (ocbFbService) {
                                return ocbFbService.data('tournaments').$asArray();
                            }
                        }
                    },
                        'tournaments@tournaments.manage': {
                            url: '',
                            templateUrl: 'tournaments/list/list.html',
                            controller: 'TournamentsListCtrl',
                            resolve: {
                                tournaments: function(ocbFbService) {
                                    return ocbFbService.data('tournaments').$asArray();
                                }
                            }
                        }
                    }
            })
    })
    .service('ocbFbService', function ($firebase) {
        var year = '2015/';
        var baseUrl = 'https://ocb.firebaseio.com/Year/';

        this.data = function(path) {
            var conn = new Firebase(baseUrl.concat(year, path));
            return $firebase(conn);
        };
    });