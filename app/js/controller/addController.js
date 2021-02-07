webApp.controller('addController', function ($scope, includeService, $location) {

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
});