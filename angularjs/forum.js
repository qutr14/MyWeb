'use strict'

angular.module("communityApp.forum",['ui.bootstrap'])
    .controller('forumCtrl',['$scope','$http',function($scope, $http){
        $http.get("./angularjs/post_forum.json").then(function(response){
            var data = response.data;
            $scope.articleList = data;
        });
    }])

        