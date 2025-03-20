import { loadHeaderFooter, qs } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cartElement = qs(".product-list");
const cart = new ShoppingCart("so-cart", cartElement);
cart.init();
