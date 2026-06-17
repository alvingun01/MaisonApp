angular.module("MaisonApp").service("HttpService", function ($http) {
    const BASE_URL = "http://localhost:8001/api/";
    this.login = function (username, password, success, error) {
        $http.post(BASE_URL + "login", { username, password }).then(success).catch(error);
    }
    this.register = function (username, email, password, success, error) {
        $http.post(BASE_URL + "register/", { username, email, password }).then(success).catch(error);
    }
    this.logout = function (token, success, error) {
        $http.post(BASE_URL + "logout", { token }).then(success).catch(error);
    }
    this.getProducts = function (success, error) {
        $http.get(BASE_URL + "products").then(success).catch(error);
    }
    this.getOrders = function (success, error) {
        $http.get(BASE_URL + "orders").then(success).catch(error);
    }
    this.createOrder = function (order, success, error) {
        $http.post(BASE_URL + "orders", order).then(success).catch(error);
    }
    this.updateOrder = function (order, success, error) {
        $http.put(BASE_URL + "orders/" + order.id, order).then(success).catch(error);
    }
    this.deleteOrder = function (id, success, error) {
        $http.delete(BASE_URL + "orders/" + id).then(success).catch(error);
    }
    this.getProducts = function (success, error) {
        $http.get(BASE_URL + "products/").then(success).catch(error);
    }
    this.createProducts = function (product, success, error) {
        $http.post(BASE_URL + "products", product).then(success).catch(error);
    }
    this.updateProducts = function (product, success, error) {
        $http.put(BASE_URL + "products/" + product.id, product).then(success).catch(error);
    }
    this.deleteProducts = function (id, success, error) {
        $http.delete(BASE_URL + "products/" + id).then(success).catch(error);
    }
    this.getCartItems = function (success, error) {
        $http.get(BASE_URL + "cart-items").then(success).catch(error);
    }
    this.createCartItem = function (item, success, error) {
        $http.post(BASE_URL + "cart-items", item).then(success).catch(error);
    }
    this.updateCartItem = function (item, success, error) {
        $http.put(BASE_URL + "cart-items/" + item.id, item).then(success).catch(error);
    }
    this.deleteCartItem = function (id, success, error) {
        $http.delete(BASE_URL + "cart-items/" + id).then(success).catch(error);
    }
})