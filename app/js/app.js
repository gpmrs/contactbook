var webApp = angular.module('webApp', ["ngRoute"]);

webApp.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            name: "home",
            templateUrl: "app/templates/views/home.html"
        })
        .when("/add", {
            name: "add new",
            templateUrl: "app/templates/views/add.html",
            controller: "addController"
        });
});