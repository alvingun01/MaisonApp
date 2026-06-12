angular.module("MaisonApp").controller("CheckoutController", [
    "$scope", "$location", "OrderService", "CartService", function ($scope, $location, OrderService, CartService) {
        $scope.step = 1;
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.email = "";
        $scope.phone = "";
        $scope.line1 = "";
        $scope.line2 = "";
        $scope.city = "";
        $scope.zip = "";
        $scope.country = "";
        $scope.ccNumber = "";
        $scope.ccName = "";
        $scope.ccExp = "";
        $scope.ccCVV = "";
        $scope.currPaymentMode = "card"
        $scope.paymentInfo = {}
        $scope.cart = CartService.getCartItems();
        $scope.shippingCost = CartService.getShipping();
        $scope.subtotal = CartService.getSubtotal();
        $scope.discount = CartService.getDiscount();
        $scope.total = $scope.subtotal + $scope.shippingCost - $scope.discount;
        $scope.order = {}
        $scope.nextStep = function () {
            if ($scope.step === 1) {
                $scope.paymentInfo = {
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    email: $scope.email,
                    phone: $scope.phone,
                    line1: $scope.line1,
                    line2: $scope.line2,
                    city: $scope.city,
                    zip: $scope.zip,
                    country: $scope.country,
                    ccNumber: $scope.ccNumber,
                    ccName: $scope.ccName,
                    ccExp: $scope.ccExp,
                    ccCVV: $scope.ccCVV,
                    currPaymentMode: $scope.currPaymentMode,

                }
                $scope.step = 2;
            } else if ($scope.step === 2) {
                $scope.paymentInfo.currPaymentMode = $scope.currPaymentMode;
                $scope.order = OrderService.createOrder($scope.cart, $scope.paymentInfo, CartService.getShipping(), CartService.getSubtotal(), CartService.getDiscount());
                CartService.clearCart();
                $scope.step = 3;
            }
        }

        $scope.prevStep = function () {
            if ($scope.step === 3) {
                $scope.step = 2;
            } else if ($scope.step === 2) {
                $scope.step = 1;
            }
        }
        $scope.paymentMode = function (mode) {
            if (mode === "card") {
                $scope.currPaymentMode = "card"
            } else if (mode === "paypal") {
                $scope.currPaymentMode = "paypal"
            } else if (mode === "apple") {
                $scope.currPaymentMode = "apple"
            }
        }
    }
])