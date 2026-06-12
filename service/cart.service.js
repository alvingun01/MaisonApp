angular.module("MaisonApp").service("CartService", ["$rootScope", "$location", function ($rootScope, $location) {
    this.cart = JSON.parse(localStorage.getItem("cart")) || {};
    this.shippingCost = JSON.parse(localStorage.getItem("shippingCost")) || 18;
    this.shippingThreshold = JSON.parse(localStorage.getItem("shippingThreshold")) || 100;
    this.promos = JSON.parse(localStorage.getItem("promo")) || {};
    this.promoCode = localStorage.getItem("applied_promo") || "";
    this.promo = (this.promos && this.promoCode) ? this.promos[this.promoCode] : null;
    this.discount = 0;

    const saveCart = () => {
        localStorage.setItem("cart", JSON.stringify(this.cart));
        $rootScope.cart = this.cart;
    };

    this.removeFromCart = function (item) {
        delete this.cart[item.id];
        saveCart();
    }
    this.getCartItems = function () {
        return this.cart;
    }
    this.increaseQuantity = function (item) {
        this.cart[item.id].quantity++;
        saveCart();
    }
    this.decreaseQuantity = function (item) {
        if (this.cart[item.id].quantity > 1) {
            this.cart[item.id].quantity--;
            saveCart();
        }
        else {
            this.removeFromCart(item);
        }
    }
    this.getCartCount = function () {
        let count = 0;
        angular.forEach(this.cart, function (item) {
            count += item.quantity;
        })
        return count;
    }
    this.getSubtotal = function () {
        let subtotal = 0;
        angular.forEach(this.cart, function (item) {
            subtotal += item.price * item.quantity;
        })
        return subtotal;
    }
    this.clearCart = function () {
        this.cart = {};
        saveCart();
    }
    this.getItemSubtotal = function (item) {
        return item.price * item.quantity;
    }
    this.getShipping = function () {
        return this.getSubtotal() >= this.shippingThreshold ? 0 : this.shippingCost;
    }
    this.getTotal = function () {
        return this.getSubtotal() + this.getShipping() - this.getDiscount();
    }
    this.getShippingRemaining = function () {
        return this.getSubtotal() >= this.shippingThreshold ? 0 : this.shippingThreshold - this.getSubtotal();
    }
    this.addToCart = function (product, qty, selectedSize) {
        qty = qty || 1;
        if (this.cart[product.id]) {
            this.cart[product.id].quantity += qty;
        } else {
            this.cart[product.id] = angular.copy(product);
            this.cart[product.id].quantity = qty;
        }
        if (selectedSize) {
            this.cart[product.id].selectedSize = selectedSize;
        }
        saveCart();
        $location.path("/cart");
    }
    this.applyPromo = function (code) {
        if (this.promos && code in this.promos) {
            this.promo = this.promos[code];
            this.promoCode = code;
            localStorage.setItem("applied_promo", code);
        }
    }
    this.getDiscount = function () {
        return this.promo ? this.getSubtotal() * this.promo : 0;
    }
}])