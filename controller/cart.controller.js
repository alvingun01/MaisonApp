angular.module("MaisonApp").controller("CartController", function ($scope, CartService) {
    $scope.removeFromCart = function (item) {
        CartService.removeFromCart(item);
        $scope.$root.cart = CartService.cart;
    }
    $scope.promoCode = CartService.promoCode;

    $scope.increaseQuantity = function (item) {
        CartService.increaseQuantity(item);
        $scope.$root.cart = CartService.cart;
    }

    $scope.decreaseQuantity = function (item) {
        CartService.decreaseQuantity(item);
        $scope.$root.cart = CartService.cart;
    }
    $scope.getCartCount = function () {
        return CartService.getCartCount();
    }
    $scope.getSubtotal = function () {
        return CartService.getSubtotal();
    }
    $scope.getItemSubtotal = function (item) {
        return CartService.getItemSubtotal(item);
    }
    $scope.getShipping = function () {
        return CartService.getShipping();
    }
    $scope.getTotal = function () {
        return CartService.getTotal();
    }
    $scope.getShippingRemaining = function () {
        return CartService.getShippingRemaining();
    }
    $scope.applyPromo = function () {
        CartService.applyPromo($scope.promoCode);
    }
    $scope.getDiscount = function () {
        return CartService.getDiscount();
    }
})