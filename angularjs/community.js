'use strict';

angular.module("communityApp",[
  'ngRoute',
  'communityApp.forum',
  'communityApp.article'
]).
config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when("/",{templateUrl:"./angularjs/forum.html",controller:"forumCtrl"})
  .when("/:id",{templateUrl:"./angularjs/article.html",controller:"articleCtrl"})
  .otherwise({redirectTo: "/"});
}]);