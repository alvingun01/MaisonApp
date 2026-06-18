angular.module("MaisonApp").service("CartService", ["$rootScope", "$location", "HttpService", function ($rootScope, $location, HttpService) {
    const self = this;
    self.cart = {};
    self.shippingCost = JSON.parse(localStorage.getItem("shippingCost")) || 18;
    self.shippingThreshold = JSON.parse(localStorage.getItem("shippingThreshold")) || 100;
    self.promos = JSON.parse(localStorage.getItem("promo")) || {};
    self.promoCode = localStorage.getItem("applied_promo") || "";
    self.promo = (self.promos && self.promoCode) ? self.promos[self.promoCode] : null;
    self.discount = 0;

    const isLoggedIn = () => !!localStorage.getItem("token");

    const saveCartLocal = () => {
        localStorage.setItem("cart", JSON.stringify(self.cart));
        $rootScope.cart = self.cart;
    };

    self.loadCart = function () {
        if (isLoggedIn()) {
            HttpService.getCartItems(
                function (response) {
                    self.cart = {};
                    if (Array.isArray(response.data)) {
                        response.data.forEach(item => {
                            // item is: { id, product, quantity, selected_size, user }
                            // item.product is the product ID key, e.g., "p001"
                            const prodDetails = PRODUCTS[item.product];
                            if (prodDetails) {
                                self.cart[item.product] = angular.copy(prodDetails);
                                self.cart[item.product].dbId = item.id;
                                self.cart[item.product].quantity = item.quantity;
                                self.cart[item.product].selectedSize = item.selected_size;
                            }
                        });
                    }
                    $rootScope.cart = self.cart;
                },
                function (error) {
                    console.error('Error fetching cart from database:', error);
                }
            );
        } else {
            if ($location.path() === "/cart") {
                $location.path("/login");
            }
        }
    };

    // Load initial cart
    self.loadCart();

    // Reload cart on route changes to stay in sync with user state
    $rootScope.$on('$routeChangeSuccess', function () {
        self.loadCart();
    });

    self.removeFromCart = function (item) {
        if (isLoggedIn() && item.dbId) {
            HttpService.deleteCartItem(item.dbId, function (response) {
                delete self.cart[item.id];
                $rootScope.cart = self.cart;
            }, function (error) {
                console.error('Error removing cart item from database:', error);
            });
        } else {
            delete self.cart[item.id];
            saveCartLocal();
        }
    };

    self.getCartItems = function () {
        return self.cart;
    };

    self.increaseQuantity = function (item) {
        if (isLoggedIn() && item.dbId) {
            const nextQty = item.quantity + 1;
            const updatePayload = {
                id: item.dbId,
                product: item.id,
                quantity: nextQty,
                selected_size: item.selectedSize || ""
            };
            HttpService.updateCartItem(updatePayload, function (response) {
                self.cart[item.id].quantity = nextQty;
                $rootScope.cart = self.cart;
            }, function (error) {
                console.error('Error updating cart item quantity:', error);
            });
        } else {
            self.cart[item.id].quantity++;
            saveCartLocal();
        }
    };

    self.decreaseQuantity = function (item) {
        if (self.cart[item.id].quantity > 1) {
            if (isLoggedIn() && item.dbId) {
                const nextQty = item.quantity - 1;
                const updatePayload = {
                    id: item.dbId,
                    product: item.id,
                    quantity: nextQty,
                    selected_size: item.selectedSize || ""
                };
                HttpService.updateCartItem(updatePayload, function (response) {
                    self.cart[item.id].quantity = nextQty;
                    $rootScope.cart = self.cart;
                }, function (error) {
                    console.error('Error updating cart item quantity:', error);
                });
            } else {
                self.cart[item.id].quantity--;
                saveCartLocal();
            }
        } else {
            self.removeFromCart(item);
        }
    };

    self.getCartCount = function () {
        let count = 0;
        angular.forEach(self.cart, function (item) {
            count += item.quantity;
        });
        return count;
    };

    self.getSubtotal = function () {
        let subtotal = 0;
        angular.forEach(self.cart, function (item) {
            subtotal += item.price * item.quantity;
        });
        return subtotal;
    };

    self.clearCart = function () {
        if (isLoggedIn()) {
            const itemsToDelete = Object.values(self.cart);
            itemsToDelete.forEach(item => {
                if (item.dbId) {
                    HttpService.deleteCartItem(item.dbId, function (response) {
                        delete self.cart[item.id];
                        $rootScope.cart = self.cart;
                    }, function (error) {
                        console.error('Error clearing cart item:', error);
                    });
                }
            });
        } else {
            self.cart = {};
            saveCartLocal();
        }
    };

    self.getItemSubtotal = function (item) {
        return item.price * item.quantity;
    };

    self.getShipping = function () {
        return self.getSubtotal() >= self.shippingThreshold ? 0 : self.shippingCost;
    };

    self.getTotal = function () {
        return self.getSubtotal() + self.getShipping() - self.getDiscount();
    };

    self.getShippingRemaining = function () {
        return self.getSubtotal() >= self.shippingThreshold ? 0 : self.shippingThreshold - self.getSubtotal();
    };

    self.addToCart = function (product, qty, selectedSize) {
        qty = qty || 1;
        selectedSize = selectedSize || "";

        if (isLoggedIn()) {
            if (self.cart[product.id]) {
                const nextQty = self.cart[product.id].quantity + qty;
                const updatePayload = {
                    id: self.cart[product.id].dbId,
                    product: product.id,
                    quantity: nextQty,
                    selected_size: selectedSize || self.cart[product.id].selectedSize || ""
                };
                HttpService.updateCartItem(updatePayload, function (response) {
                    self.cart[product.id].quantity = nextQty;
                    if (selectedSize) {
                        self.cart[product.id].selectedSize = selectedSize;
                    }
                    $rootScope.cart = self.cart;
                    $location.path("/cart");
                }, function (error) {
                    console.error('Error updating cart item on add:', error);
                });
            } else {
                const createPayload = {
                    product: product.id,
                    quantity: qty,
                    selected_size: selectedSize || ""
                };
                HttpService.createCartItem(createPayload, function (response) {
                    self.cart[product.id] = angular.copy(product);
                    self.cart[product.id].dbId = response.data.id;
                    self.cart[product.id].quantity = qty;
                    self.cart[product.id].selectedSize = selectedSize;
                    $rootScope.cart = self.cart;
                    $location.path("/cart");
                }, function (error) {
                    console.error('Error creating cart item on add:', error);
                });
            }
        }
        else {
            $location.path("/login");
        }
        // else {
        //     if (self.cart[product.id]) {
        //         self.cart[product.id].quantity += qty;
        //     } else {
        //         self.cart[product.id] = angular.copy(product);
        //         self.cart[product.id].quantity = qty;
        //     }
        //     if (selectedSize) {
        //         self.cart[product.id].selectedSize = selectedSize;
        //     }
        //     saveCartLocal();
        //     $location.path("/cart");
        // }
    };

    self.applyPromo = function (code) {
        if (self.promos && code in self.promos) {
            self.promo = self.promos[code];
            self.promoCode = code;
            localStorage.setItem("applied_promo", code);
        }
    };

    self.getDiscount = function () {
        return self.promo ? self.getSubtotal() * self.promo : 0;
    };
}]);