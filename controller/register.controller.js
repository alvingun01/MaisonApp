angular.module("MaisonApp").controller("RegisterController", ['$scope', '$location', 'HttpService', function ($scope, $location, HttpService) {
    $scope.user = {};
    $scope.errorMsg = "";

    $scope.register = function () {
        $scope.errorMsg = "";
        HttpService.register(
            $scope.user.username, 
            $scope.user.email, 
            $scope.user.password, 
            function (res) {
                // Store token and redirect on success
                localStorage.setItem("token", res.data.token);
                $location.path("/");
            }, 
            function (err) {
                console.error(err);
                if (err.data && err.data.error) {
                    $scope.errorMsg = err.data.error;
                } else if (err.data) {
                    // Collect field validation errors
                    const errors = [];
                    angular.forEach(err.data, function (messages, field) {
                        errors.push(field + ": " + (Array.isArray(messages) ? messages.join(" ") : messages));
                    });
                    $scope.errorMsg = errors.join("; ");
                } else {
                    $scope.errorMsg = "Registration failed. Please try again.";
                }
            }
        );
    }
}]);
