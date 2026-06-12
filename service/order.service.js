angular.module("MaisonApp").service("OrderService", function () {
    this.order = {};
    this.orders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];
    this.createOrder = function (cartItems, paymentInfo, shippingCost, subtotal, discount) {
        this.order = {}
        this.order.id = "ORD-" + Date.now();
        this.order.date = new Date();
        this.order.products = cartItems;
        this.order.paymentInfo = paymentInfo;
        this.order.shippingCost = shippingCost;
        this.order.subtotal = subtotal;
        this.order.discount = discount;
        this.order.total = subtotal + shippingCost - discount;
        this.orders.push(this.order);
        localStorage.setItem("orders", JSON.stringify(this.orders));
        return this.order;
    }
    this.getOrder = function () {
        return this.orders;
    }
    this.getOrderById = function (id) {
        return this.orders.find(order => order.id === id);
    }
    this.updateOrder = function (order) {
        const index = this.orders.findIndex(item => item.id === order.id);
        if (index !== -1) {
            this.orders[index] = order;
            localStorage.setItem("orders", JSON.stringify(this.orders));
        }
    }
    this.deleteOrder = function (id) {
        const index = this.orders.findIndex(order => order.id === id);
        if (index !== -1) {
            this.orders.splice(index, 1);
            localStorage.setItem("orders", JSON.stringify(this.orders));
        }
    }
    this.clearOrder = function () {
        this.orders = [];
        localStorage.removeItem("orders");
    }
    this.clearCart = function () {
        this.cart = {};
        localStorage.removeItem("cart");
    }
    this.clearAll = function () {
        this.clearOrder();
        this.clearCart();
    }
})