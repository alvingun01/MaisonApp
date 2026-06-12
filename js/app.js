// ============================================================
// js/app.js — MAISON Static Shop
// Add your JavaScript here.
//
// All HTML elements have been prepared with:
//   - IDs for direct lookups (e.g. document.getElementById('cart-count'))
//   - data-product-id attributes on every product card and action button
//   - data-action attributes to identify button intent
//   - data-category / data-price / data-rating on catalog cards for filtering
//
// PRODUCT CATALOG
// ===============
// All 12 products are listed below as a JS object for use in your code.
// ============================================================

const PRODUCTS = {
  p001: {
    id: "p001",
    name: "Ceramic Pour-Over Set",
    category: "Kitchen",
    price: 148,
    original: null,
    emoji: "🫖",
    rating: 4.8,
    reviews: 124,
    stock: 12,
    badge: "new",
    sizes: null,
    desc: "Hand-thrown stoneware pour-over brewer and server, finished in a warm ash glaze. Each piece is unique. Holds 600ml.",
    material: "Stoneware",
    origin: "Kyoto, Japan",
    sku: "KIT-001",
  },
  p002: {
    id: "p002",
    name: "Merino Throw Blanket",
    category: "Home",
    price: 220,
    original: 275,
    emoji: "🧣",
    rating: 4.9,
    reviews: 89,
    stock: 6,
    badge: "sale",
    sizes: ["Small", "Medium", "Large"],
    desc: "Ultra-fine merino wool throw, naturally temperature-regulating and supremely soft. Woven in the Portuguese highlands.",
    material: "Merino Wool",
    origin: "Portugal",
    sku: "HOM-002",
  },
  p003: {
    id: "p003",
    name: "Brass Desk Lamp",
    category: "Lighting",
    price: 340,
    original: null,
    emoji: "🪔",
    rating: 4.7,
    reviews: 56,
    stock: 8,
    badge: null,
    sizes: null,
    desc: "Articulated solid brass desk lamp with a linen shade and inline dimmer switch.",
    material: "Solid Brass & Linen",
    origin: "Denmark",
    sku: "LIT-003",
  },
  p004: {
    id: "p004",
    name: "Linen Tote Bag",
    category: "Accessories",
    price: 68,
    original: null,
    emoji: "👜",
    rating: 4.6,
    reviews: 210,
    stock: 30,
    badge: "new",
    sizes: null,
    desc: "Heavy-duty natural linen with vegetable-tanned leather handles.",
    material: "Linen & Leather",
    origin: "Brittany, France",
    sku: "ACC-004",
  },
  p005: {
    id: "p005",
    name: "Beeswax Candle Trio",
    category: "Home",
    price: 58,
    original: null,
    emoji: "🕯️",
    rating: 4.9,
    reviews: 347,
    stock: 4,
    badge: "low",
    sizes: null,
    desc: "Rolled from 100% pure beeswax sheets in three graduated heights. Clean burning, naturally fragrant.",
    material: "Pure Beeswax",
    origin: "Vermont, USA",
    sku: "HOM-005",
  },
  p006: {
    id: "p006",
    name: "Walnut Cutting Board",
    category: "Kitchen",
    price: 125,
    original: 155,
    emoji: "🪵",
    rating: 4.8,
    reviews: 98,
    stock: 15,
    badge: "sale",
    sizes: ["S — 30×20cm", "M — 40×28cm", "L — 50×35cm"],
    desc: "Edge-grain American black walnut, oiled with food-safe mineral oil.",
    material: "Black Walnut",
    origin: "Vermont, USA",
    sku: "KIT-006",
  },
  p007: {
    id: "p007",
    name: "Woven Rattan Chair",
    category: "Furniture",
    price: 680,
    original: null,
    emoji: "🪑",
    rating: 4.5,
    reviews: 33,
    stock: 3,
    badge: null,
    sizes: null,
    desc: "Handwoven natural rattan with a powder-coated steel frame. Lightweight and airy.",
    material: "Rattan & Steel",
    origin: "Bali, Indonesia",
    sku: "FUR-007",
  },
  p008: {
    id: "p008",
    name: "Indigo Linen Cushion",
    category: "Home",
    price: 95,
    original: null,
    emoji: "🔵",
    rating: 4.7,
    reviews: 67,
    stock: 18,
    badge: null,
    sizes: ["45×45cm", "60×40cm"],
    desc: "Stone-washed linen cushion cover in natural indigo dye. Feather insert included.",
    material: "Stonewashed Linen",
    origin: "Lithuania",
    sku: "HOM-008",
  },
  p009: {
    id: "p009",
    name: "Oak Side Table",
    category: "Furniture",
    price: 420,
    original: 520,
    emoji: "🪞",
    rating: 4.8,
    reviews: 44,
    stock: 5,
    badge: "sale",
    sizes: null,
    desc: "Solid white oak with hand-cut mortise and tenon joinery. Matte oil finish.",
    material: "White Oak",
    origin: "Bavaria, Germany",
    sku: "FUR-009",
  },
  p010: {
    id: "p010",
    name: "Leather Journal",
    category: "Accessories",
    price: 78,
    original: null,
    emoji: "📒",
    rating: 4.9,
    reviews: 512,
    stock: 25,
    badge: "new",
    sizes: ["A5", "A4"],
    desc: "Full-grain vegetable-tanned leather with 240 pages of acid-free paper.",
    material: "Vegetable-tanned Leather",
    origin: "Florence, Italy",
    sku: "ACC-010",
  },
  p011: {
    id: "p011",
    name: "Terrarium Globe",
    category: "Decor",
    price: 190,
    original: null,
    emoji: "🌿",
    rating: 4.6,
    reviews: 78,
    stock: 7,
    badge: null,
    sizes: ["Small (15cm)", "Large (25cm)"],
    desc: "Hand-blown borosilicate glass globe with a cork stopper and copper stand.",
    material: "Borosilicate Glass & Copper",
    origin: "Czech Republic",
    sku: "DEC-011",
  },
  p012: {
    id: "p012",
    name: "Hand-Thrown Vase",
    category: "Decor",
    price: 165,
    original: null,
    emoji: "🏺",
    rating: 4.7,
    reviews: 91,
    stock: 9,
    badge: null,
    sizes: null,
    desc: "Wheel-thrown terracotta vase with a raw matte glaze. Each piece is one of a kind.",
    material: "Terracotta",
    origin: "Oaxaca, Mexico",
    sku: "DEC-012",
  },
};

// PROMO CODES
const PROMO_CODES = {
  MAISON10: 0.1,
  WELCOME20: 0.2,
  SAVE15: 0.15,
};

// SHIPPING: free over $300, otherwise $18
const SHIPPING_THRESHOLD = 300;
const SHIPPING_COST = 18;

let storedPromo = localStorage.getItem("promo");
try {
  let parsedPromo = storedPromo ? JSON.parse(storedPromo) : null;
  if (!parsedPromo || typeof parsedPromo !== 'object' || Array.isArray(parsedPromo)) {
    localStorage.setItem("promo", JSON.stringify(PROMO_CODES));
  }
} catch (e) {
  localStorage.setItem("promo", JSON.stringify(PROMO_CODES));
}
// Store in local storage
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(PRODUCTS));
}
if (!localStorage.getItem("promo_codes")) {
  localStorage.setItem("promo_codes", JSON.stringify(PROMO_CODES));
}
if (!localStorage.getItem("shipping_threshold")) {
  localStorage.setItem("shipping_threshold", JSON.stringify(SHIPPING_THRESHOLD));
}
if (!localStorage.getItem("shipping_cost")) {
  localStorage.setItem("shipping_cost", JSON.stringify(SHIPPING_COST));
}


// ============================================================
// TODO: Implement the following features by adding JS below
// ============================================================

// 1. HEADER SCROLL EFFECT
//    Add 'header--scrolled' class to #site-header when window.scrollY > 10
//    window.addEventListener('scroll', () => { ... });

// 2. CART PERSISTENCE (localStorage key: 'maison_cart')
//    Format: [{ id, name, price, emoji, category, qty, size }]
//    - Load cart on every page and update #cart-count
//    - 'Add to Cart' buttons: data-action="add-to-cart", data-product-id="pXXX"
//    - 'Remove' buttons in cart.html: data-action="remove", data-product-id="pXXX"
//    - Qty +/- buttons in cart.html: class="qty-btn-inc / qty-btn-dec"

// 3. WISHLIST PERSISTENCE (localStorage key: 'maison_wishlist')
//    Format: [{ id, name, price, emoji, category }]
//    - Wishlist heart buttons: class="product-card__wishlist", data-product-id="pXXX"
//    - Toggle ♡/♥ and 'wished' class
//    - Update #wishlist-count badge
//    - 'Remove from wishlist' buttons: data-action="remove-from-wishlist"
//    - 'Move to Cart' buttons: data-action="move-to-cart"

// 4. TOAST NOTIFICATIONS
//    Show #toast with 'toast--visible' class, set #toast-message text
//    Remove 'toast--visible' after 2800ms
//    For errors: add 'toast--error', set #toast-icon to '✕'

// 5. CATALOG PAGE (catalog.html)
//    - Filter buttons (#filter-bar .filter-btn): toggle 'filter-btn--active'
//      Show/hide .product-card elements based on data-category
//    - Sort select (#sort-select): re-order visible cards
//    - Search input (#search-input): filter by product name
//    - Show/hide #empty-state when no cards are visible
//    - Update #product-count text with visible count

// 6. PRODUCT DETAIL PAGE (product.html)
//    - Read ?id=pXXX from URL: new URLSearchParams(window.location.search).get('id')
//    - Populate all #product-* elements from PRODUCTS[id]
//    - Show #size-section and inject size buttons if product.sizes exists
//    - Qty picker: #qty-dec / #qty-inc modify #qty-val (min 1, max product.stock)
//    - #add-to-cart-btn: add to cart with selected qty and size
//    - #buy-now-btn: add to cart then redirect to cart.html
//    - #wishlist-btn: toggle wishlist state (♡/♥)
//    - Show low stock warning in #stock-msg if stock <= 5
//    - Update page <title> with product name

// 7. CART PAGE (cart.html)
//    - Render cart items from localStorage into #cart-items (replace hardcoded HTML)
//    - Show #cart-empty / #cart-content based on cart length
//    - Qty buttons update cart and recalculate totals
//    - 'Remove' buttons delete item from cart
//    - Promo code (#promo-input + #promo-apply-btn): validate against PROMO_CODES
//      Show/hide #discount-line, update #summary-discount
//    - Update #summary-subtotal, #summary-shipping, #summary-total live
//    - Show free shipping message or remaining amount in #shipping-msg

// 8. CHECKOUT PAGE (checkout.html)
//    - Step 1 → Step 2: #step1-next-btn validates #addr-form required fields
//      Show #addr-error if invalid. Transition: hide #step-1, show #step-2
//      Update step indicator circles (style / text)
//    - Payment method buttons (data-method): toggle 'pay-option--active'
//      Show/hide #card-fields, #paypal-fields, #apple-fields
//    - Step 2 → Step 3: #step2-next-btn validates payment fields
//      Generate order ID: 'MSN-' + Date.now().toString(36).toUpperCase()
//      Save order to localStorage ('maison_orders'), clear cart
//      Show #step-3, update #confirmed-order-id and #confirmed-address
//    - #step2-back-btn: show #step-1, hide #step-2

// 9. ORDERS PAGE (orders.html)
//    - Load orders from localStorage ('maison_orders')
//    - If empty, hide #orders-list content, show #orders-empty
//    - Render orders dynamically (replace hardcoded order cards)

// ============================================================
// HELPER: Get/Set localStorage with JSON
// ============================================================
function storageGet(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) { }
}

angular.module('MaisonApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: "HomeController"
      })
      .when('/catalog', {
        templateUrl: 'views/catalog.html',
        controller: "CatalogController"
      })
      .when('/product/:id', {
        templateUrl: 'views/product.html',
        controller: "ProductController"
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: "CartController"
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: "CheckoutController"
      })
      .when('/orders', {
        templateUrl: 'views/orders.html',
        controller: "OrdersController"
      })
      .when('/wishlist', {
        templateUrl: 'views/wishlist.html',
        controller: "WishlistController"
      })
      .when('/orders', {
        templateUrl: 'views/orders.html',
        controller: "OrdersController"
      })
      .otherwise({
        redirectTo: '/',
      });
  })
  .run(['$rootScope', '$location', '$window', "CartService", function ($rootScope, $location, $window, CartService) {
    // Load initial cart and wishlist states on $rootScope
    try {
      // if (!localStorage.getItem("shippingCost")) {
      //   localStorage.setItem("shippingCost", JSON.stringify(18));
      // }
      // if (!localStorage.getItem("shippingThreshold")) {
      //   localStorage.setItem("shippingThreshold", JSON.stringify(100));
      // }
      // const storedCart = localStorage.getItem("cart");
      // let parsedCart = storedCart ? JSON.parse(storedCart) : {};

      // // Migrate old array-based cart format to new keyed-object format
      // if (Array.isArray(parsedCart)) {
      //   const obj = {};
      //   parsedCart.forEach(item => {
      //     if (item && item.id) {
      //       if (obj[item.id]) {
      //         obj[item.id].quantity = (obj[item.id].quantity || 1) + 1;
      //       } else {
      //         obj[item.id] = item;
      //         obj[item.id].quantity = 1;
      //       }
      //     }
      //   });
      //   parsedCart = obj;
      //   localStorage.setItem("cart", JSON.stringify(parsedCart));
      // }
      $rootScope.cart = CartService.getCartItems();
    } catch (e) {
      $rootScope.cart = {};
    }

    try {
      const storedWish = localStorage.getItem("wishlist");
      let parsedWish = storedWish ? JSON.parse(storedWish) : {};
      if (Array.isArray(parsedWish)) {
        const obj = {};
        parsedWish.forEach(item => {
          if (item && item.id) {
            obj[item.id] = item;
          }
        });
        parsedWish = obj;
        localStorage.setItem("wishlist", JSON.stringify(parsedWish));
      }
      $rootScope.wishlist = parsedWish;
    } catch (e) {
      $rootScope.wishlist = {};
    }

    // Helper to compute total items in the cart
    $rootScope.getCartCount = function () {
      return CartService.getCartCount();
      let count = 0;
      angular.forEach($rootScope.cart, function (item) {
        count += (item.quantity || 1);
      });
      return count;
    };

    $rootScope.getWishlistCount = function () {
      if (!$rootScope.wishlist) return 0;
      return Object.keys($rootScope.wishlist).length;
    };

    $rootScope.$on('$routeChangeSuccess', function () {
      $rootScope.currentPath = $location.path();
    });
  }]);
