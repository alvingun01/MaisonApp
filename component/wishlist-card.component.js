angular.module("MaisonApp").component("wishlistCard", {
    bindings: {
        product: "<",
        moveToCart: "&",
        removeFromWishlist: "&"
    },
    templateUrl: "component/wishlist-card.component.html",
    controller: function () {
        this.handleMoveToCart = function () {
            this.moveToCart({ product: this.product });
        }
        this.handleRemoveFromWishlist = function () {
            this.removeFromWishlist({ product: this.product });
        }
    }
});