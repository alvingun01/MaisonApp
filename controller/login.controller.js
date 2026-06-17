angular.module("MaisonApp").controller("LoginController", ['$scope', '$location', 'HttpService', function ($scope, $location, HttpService) {
    $scope.user = {};
    $scope.errorMsg = "";

    $scope.login = function () {
        $scope.errorMsg = "";
        HttpService.login($scope.user.username, $scope.user.password, function (res) {
            localStorage.setItem("token", res.data.token);
            $location.path("/");
        }, function (err) {
            console.error(err);
            if (err.data && err.data.error) {
                $scope.errorMsg = err.data.error;
            } else {
                $scope.errorMsg = "Invalid username or password.";
            }
        });
    }

    $scope.logout = function () {
        localStorage.removeItem("token");
        $location.path("/login");
    }
}]);