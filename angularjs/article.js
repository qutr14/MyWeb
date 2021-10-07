'use strict';

angular.module('communityApp.article', ['ui.bootstrap'])
    .controller('articleCtrl', ['$scope', '$filter', '$http', '$routeParams', '$sce', function($scope, $filter, $http, $routeParams, $sce){
        $scope.articleID = $routeParams.id;
        $http.get('./angularjs/post_forum.json').then(function(response){
            var data = response.data;
            $scope.article = $filter('filter')(data, {id: parseInt($scope.articleID)}, true)[0];
            if(article.reply_num==0){
                $scope.item = $sce.trustAsHtml('There are no reply for this topic');
            };
        }); 
    }]);