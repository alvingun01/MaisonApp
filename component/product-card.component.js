angular.module('MaisonApp').component('productCard', {
    bindings: {
        product: "<",
        addToCart: "&",
        addToWishlist: "&"
    },
    templateUrl: "component/product-card.component.html",
    controller: function () {
        this.onClickAddToCart = () => {
            console.log("add to cart");
            this.addToCart({ product: this.product });
        }
        this.onClickWishlist = () => {
            this.addToWishlist({ product: this.product });
        }
    }
});