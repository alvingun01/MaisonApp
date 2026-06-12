angular.module("MaisonApp").service("OrderService", ['HttpService', function (HttpService) {
    this.order = {};
    this.orders = [];

    const self = this;

    // Fetch orders from the backend on initialization
    this.loadOrders = function () {
        HttpService.getOrders(function (response) {
            self.orders.length = 0; // Clear array in place to preserve references
            if (Array.isArray(response.data)) {
                response.data.forEach(order => self.orders.push(order));
            }
        }, function (error) {
            console.error('Error fetching orders:', error);
        });
    };

    this.loadOrders();

    this.createOrder = function (cartItems, paymentInfo, shippingCost, subtotal, discount) {
        // Map frontend order payload to match Django Relational Schema
        const backendOrder = {
            id: "ORD-" + Date.now(),
            date: new Date().toISOString(),
            first_name: paymentInfo.firstName,
            last_name: paymentInfo.lastName,
            email: paymentInfo.email,
            phone: paymentInfo.phone,
            line1: paymentInfo.line1,
            line2: paymentInfo.line2 || "",
            city: paymentInfo.city,
            zip_code: paymentInfo.zip,
            country: paymentInfo.country,
            payment_mode: paymentInfo.currPaymentMode,
            shipping_cost: shippingCost,
            subtotal: subtotal,
            discount: discount,
            total: subtotal + shippingCost - discount,
            items: Object.values(cartItems).map(item => ({
                product: item.id,
                quantity: item.quantity || 1,
                price_at_purchase: item.price
            }))
        };

        HttpService.createOrder(backendOrder, function (response) {
            self.orders.push(response.data);
        }, function (error) {
            console.error('Error creating order:', error);
        });

        this.order = backendOrder;
        return this.order;
    }

    this.getOrder = function () {
        return this.orders;
    }

    this.getOrderById = function (id) {
        return this.orders.find(order => order.id === id);
    }

    this.updateOrder = function (order) {
        HttpService.updateOrder(order, function (response) {
            const index = self.orders.findIndex(item => item.id === order.id);
            if (index !== -1) {
                self.orders[index] = response.data;
            }
        }, function (error) {
            console.error('Error updating order:', error);
        });
    }

    this.deleteOrder = function (id) {
        HttpService.deleteOrder(id, function (response) {
            const index = self.orders.findIndex(order => order.id === id);
            if (index !== -1) {
                self.orders.splice(index, 1);
            }
        }, function (error) {
            console.error('Error deleting order:', error);
        });
    }

    this.clearOrder = function () {
        this.orders.length = 0;
    }

    this.clearCart = function () {
        this.cart = {};
        localStorage.removeItem("cart");
    }

    this.clearAll = function () {
        this.clearOrder();
        this.clearCart();
    }
}]);
