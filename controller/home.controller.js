angular.module('MaisonApp').controller('HomeController', ['$scope', function ($scope) {
    // Fetch products from localStorage or default PRODUCTS array
    let products = [];
    try {
        const stored = localStorage.getItem("products");
        const parsed = stored ? JSON.parse(stored) : {};
        products = Array.isArray(parsed) ? parsed : Object.values(parsed);
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