angular.module("MaisonApp").service("HttpService", function ($http) {
    const BASE_URL = "http://localhost:8001/api/";
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
})