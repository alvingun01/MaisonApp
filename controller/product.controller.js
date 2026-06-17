angular.module("MaisonApp").controller("ProductController", ['$scope', '$routeParams', '$location', 'CartService', 'HttpService', function ($scope, $routeParams, $location, CartService, HttpService) {
    const productId = $routeParams.id;
    console.log(productId);

    $scope.products = [];
    $scope.currProduct = null;
    $scope.quantity = 1;
    $scope.selectedSize = '';

    HttpService.getProducts(function (response) {
        const parsedProducts = response.data;
        $scope.products = Array.isArray(parsedProducts) ? parsedProducts : Object.values(parsedProducts);
        $scope.currProduct = $scope.products.find(product => product.id === productId);

        // Parse sizes if they are returned as a comma-separated string from Django
        if ($scope.currProduct && typeof $scope.currProduct.sizes === 'string' && $scope.currProduct.sizes.trim()) {
            $scope.currProduct.sizes = $scope.currProduct.sizes.split(',').map(s => s.trim()).filter(Boolean);
        }

        // Initial State for Details Page
        if ($scope.currProduct && $scope.currProduct.sizes && $scope.currProduct.sizes.length > 0) {
            $scope.selectedSize = $scope.currProduct.sizes[0];
        }
    }, function (error) {
        console.error('Error fetching products:', error);
    });


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