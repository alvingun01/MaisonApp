angular.module("maisonApp").service("HttpService", function ($http) {
    const BASE_URL = "http://localhost:8000/api/";
    this.getProducts = function (success, error) {
        $http.get(BASE_URL + "products").then(success).catch(error);
    }
})