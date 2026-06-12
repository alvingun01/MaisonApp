angular.module('MaisonApp').controller('CatalogController', ['$scope', 'CartService', 'HttpService', function ($scope, CartService, HttpService) {
    $scope.products = [];
    $scope.categories = [];
    $scope.selectedCategory = 'All';
    $scope.sortBy = 'default';
    $scope.sortPredicate = 'id';
    $scope.sortReverse = false;
    $scope.searchTerm = "";

    HttpService.getProducts(function (response) {
        $scope.products = response.data;
        $scope.categories = [...new Set($scope.products.map(product => product.category))];
    }, function (error) {
        console.error('Error fetching products:', error);
    });

    $scope.cart = CartService.cart;

    try {
        $scope.wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch (e) {
        $scope.wishlist = [];
    }

    $scope.changeFilter = function (category) {
        $scope.selectedCategory = category;
    };
    $scope.updateSort = function () {
        switch ($scope.sortBy) {
            case 'price-asc':
                $scope.sortPredicate = 'price';
                $scope.sortReverse = false;
                break;
            case 'price-desc':
                $scope.sortPredicate = 'price';
                $scope.sortReverse = true;
                break;
            case 'rating':
                $scope.sortPredicate = 'rating';
                $scope.sortReverse = true;
                break;
            case 'reviews':
                $scope.sortPredicate = 'reviews';
                $scope.sortReverse = true;
                break;
            default:
                $scope.sortPredicate = 'id';
                $scope.sortReverse = false;
                break;
        }
    };
    $scope.applyFilter = function (product) {
        const categoryMatch = $scope.selectedCategory === 'All' || product.category === $scope.selectedCategory;
        const searchMatch = !$scope.searchTerm || product.name.toLowerCase().includes($scope.searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    };
    $scope.addToCart = function (product) {
        CartService.addToCart(product, 1);
        $scope.cart = CartService.cart;
    };

    $scope.addToWishlist = function (product) {
        if (!$scope.wishlist[product.id]) {
            $scope.wishlist[product.id] = product;
            localStorage.setItem("wishlist", JSON.stringify($scope.wishlist));
            $scope.$root.wishlist = $scope.wishlist;
        }
    };
}]);