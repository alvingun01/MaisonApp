angular.module('MaisonApp').controller('HomeController', ['$scope', 'HttpService', function ($scope, HttpService) {
    // Fetch products from localStorage or default PRODUCTS array
    let products = [];
    try {
        HttpService.getProducts(function (response) {
            $scope.products = response.data;
        }, function (error) {
            console.error('Error fetching products:', error);
        });
    } catch (e) {
        products = [];
    }

    // if (products.length === 0 && typeof PRODUCTS !== 'undefined') {
    //     products = Object.values(PRODUCTS);
    // }

    // Select a random product
    if (products.length > 0) {
        const randomIndex = Math.floor(Math.random() * products.length);
        $scope.randomProduct = products[randomIndex];
    }
}]);