"use strict";
angular.module("app", ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state("home", {
    url: "/",
    templateUrl: "template/home.html",
    controller: function($scope, $http){
      $http.get("/").success(function(res){
        $scope.quota = JSON.parse(angular.fromJson(res));
        $scope.getList = function(){
          $http.get("/list").success(function(res){
            $scope.fileList = JSON.parse(angular.fromJson(res)).list;
          })
        }
      });
    }
  })

  $urlRouterProvider.otherwise("/");

})