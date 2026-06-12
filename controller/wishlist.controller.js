angular.module('MaisonApp').controller('WishlistController', ['$scope', 'CartService', function ($scope, CartService) {
    try {
        $scope.wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
    } catch (e) {
        $scope.wishlist = {};
    }
    $scope.cart = CartService.cart;
    $scope.$root.wishlist = $scope.wishlist;
    $scope.removeItem = function (product) {
        delete $scope.wishlist[product.id];
        localStorage.setItem("wishlist", JSON.stringify($scope.wishlist));
        $scope.$root.wishlist = $scope.wishlist;
    };
    $scope.moveToCart = function (product) {
        CartService.addToCart(product, 1);
        $scope.cart = CartService.cart;
        $scope.removeItem(product);
    };
    $scope.getWishlistCount = function () {
        return Object.keys($scope.wishlist).length;
    };
}]);