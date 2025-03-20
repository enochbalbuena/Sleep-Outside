import { getLocalStorage, setLocalStorage, qs, renderListWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  init() {
    this.renderCartContents();
    this.addRemoveEvent();
  }

  getCartItems() {
    return getLocalStorage(this.key) || [];
  }

  renderCartContents() {
    const cartItems = this.getCartItems();

    if (cartItems.length === 0) {
      this.listElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    const htmlItems = cartItems
      .map((item, index) => this.cartItemTemplate(item, index))
      .join("");

    this.listElement.innerHTML = htmlItems;
  }

  cartItemTemplate(item, index) {
    return `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No Color"}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice?.toFixed(2) || "0.00"}</p>
      <span class="remove-item" data-index="${index}" title="Remove item">❌</span>
    </li>`;
  }

  removeFromCart(itemIndex) {
    let cartItems = this.getCartItems();

    cartItems.splice(itemIndex, 1);

    setLocalStorage(this.key, cartItems);

    this.renderCartContents();
  }

  addRemoveEvent() {
    this.listElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        const itemIndex = parseInt(event.target.dataset.index, 10);
        this.removeFromCart(itemIndex);
      }
    });
  }
}
