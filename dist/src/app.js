var webApp = angular.module('webApp', ["ngRoute"]);

webApp.config(["$routeProvider", function($routeProvider) {
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
}]);
webApp.service('includeService', function () {
    var uid = 1;

    var contacts = [{
        id: 0,
        'name': 'abc',
        'email': 'abc@gmail.com',
        'phone': '123456-789'
    }];

    this.save = function (contact) {
        if (contact.id == null) {
            contact.id = uid++;
            contacts.push(contact);
        } else {
            for (i in contacts) {
                if (contacts[i].id == contact.id) {
                    contacts[i] = contact;
                }
            }
        }

    }

    this.get = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                return contacts[i];
            }
        }

    }

    this.delete = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                contacts.splice(i, 1);
            }
        }
    }

    this.list = function () {
        return contacts;
    }
});

webApp.controller('addController', ["$scope", "includeService", "$location", function ($scope, includeService, $location) {

    $scope.contacts = includeService.list();

    $scope.saveContact = function () {
        includeService.save($scope.newcontact);
        $scope.newcontact = {};
        $location.path('#!/');
    }

    $scope.delete = function (id) {

        includeService.delete(id);
        if ($scope.newcontact.id == id) $scope.newcontact = {};
    }


    $scope.edit = function (id) {
        $scope.newcontact = angular.copy(includeService.get(id));
    }
}]);
angular.module('webApp').controller('navController', ["$scope", function($scope) {
    $scope.name = "contacts";
}]);