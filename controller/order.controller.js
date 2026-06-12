angular.module("MaisonApp").controller("OrdersController", ["$scope", "OrderService", function ($scope, OrderService) {
    $scope.orders = OrderService.orders;
    $scope.deleteOrder = function (id) {
        OrderService.deleteOrder(id);
    }
}]);