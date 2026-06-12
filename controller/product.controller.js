angular.module("MaisonApp").controller("ProductController", ['$scope', '$routeParams', '$location', 'CartService', function ($scope, $routeParams, $location, CartService) {
    const productId = $routeParams.id;
    console.log(productId);
    try {
        const storedProducts = localStorage.getItem("products");
        const parsedProducts = storedProducts ? JSON.parse(storedProducts) : {};
        $scope.products = Array.isArray(parsedProducts) ? parsedProducts : Object.values(parsedProducts);
    } catch (e) {
        $scope.products = [];
    }
    $scope.currProduct = $scope.products.find(product => product.id === productId);

    // Initial State for Details Page
    $scope.quantity = 1;
    $scope.selectedSize = '';
    if ($scope.currProduct && $scope.currProduct.sizes && $scope.currProduct.sizes.length > 0) {
        $scope.selectedSize = $scope.currProduct.sizes[0];
    }

    try {
        $scope.cart = JSON.parse(localStorage.getItem("cart")) || {};
    } catch (e) {
        $scope.cart = {};
    }

    try {
        $scope.wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch (e) {
        $scope.wishlist = [];
    }

    // Action Methods
    $scope.increaseQty = function () {
        if ($scope.quantity < 12) {
            $scope.quantity++;
        }
    };

    $scope.decreaseQty = function () {
        if ($scope.quantity > 1) {
            $scope.quantity--;
        }
    };

    $scope.selectSize = function (size) {
        $scope.selectedSize = size;
    };

    $scope.addToCart = function (product, qty) {
        CartService.addToCart(product, qty, $scope.selectedSize);
    };

    $scope.buyNow = function (product, qty) {
        $scope.addToCart(product, qty);
        $location.path('/cart');
    };

    $scope.applyFilter = function (product) {
        if (product.id === productId) {
            return false;
        }
        return $scope.currProduct && product.category === $scope.currProduct.category;
    };

    $scope.addToWishlist = function (product) {
        if (!$scope.wishlist[product.id]) {
            $scope.wishlist[product.id] = product;
            localStorage.setItem("wishlist", JSON.stringify($scope.wishlist));
            $scope.$root.wishlist = $scope.wishlist;
        }
    };
}]);