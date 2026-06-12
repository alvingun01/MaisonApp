angular.module("MaisonApp").component("miniOrderSummary", {
    bindings: {
        cart: "="
    },
    templateUrl: "component/miniOrder-summary.html",
    controller: function (CartService) {
        this.shippingCost = CartService.shippingCost;
        this.shippingThreshold = CartService.shippingThreshold;
        this.getItemSubtotal = function (item) {
            return CartService.getItemSubtotal(item);
        }
        this.getSubtotal = function () {
            return CartService.getSubtotal();
        }
        this.getShipping = function () {
            return CartService.getShipping();
        }
        this.getTotal = function () {
            return CartService.getTotal();
        }
    }
})