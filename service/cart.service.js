angular.module("MaisonApp").service("CartService", ["$rootScope", "$location", "HttpService", function ($rootScope, $location, HttpService) {
    HttpService.getCartItems(
        function (response) {
            this.cart = response.data;
        },
        function (error) {
            console.error('Error fetching cart:', error);
        }
    )
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
        HttpService.deleteCartItem(item, function (response) {
            delete this.cart[item.id];
        }, function (error) {
            console.error('Error removing cart:', error);
        });
    }
    this.getCartItems = function () {
        return this.cart;
    }
    this.increaseQuantity = function (item) {
        HttpService.updateCartItem(item, function (response) {
            this.cart[item.id].quantity++;
        }, function (error) {
            console.error('Error updating cart:', error);
        });
    }
    this.decreaseQuantity = function (item) {
        if (this.cart[item.id].quantity > 1) {
            HttpService.updateCartItem(item, function (response) {
                this.cart[item.id].quantity--;
            }, function (error) {
                console.error('Error updating cart:', error);
            });
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
        this.cart.forEach(item => {
            HttpService.deleteCartItem(item, function (response) {
                delete this.cart[item.id];
            }, function (error) {
                console.error('Error removing cart:', error);
            });
        })
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
            HttpService.updateCartItem(product, function (response) {
                this.cart[product.id].quantity += qty;
            }, function (error) {
                console.error('Error updating cart:', error);
            });
        } else {
            HttpService.createCartItem(product, function (response) {
                this.cart[product.id] = angular.copy(product);
                this.cart[product.id].quantity = qty;
            }, function (error) {
                console.error('Error adding cart:', error);
            });
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