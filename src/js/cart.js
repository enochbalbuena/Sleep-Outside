import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  const deleteButtons = document.querySelectorAll(".remove-item");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const index = parseInt(event.target.dataset.index);
      removeFromCart(index);
    });
  });
}

function cartItemTemplate(item, index) {
  return `<li class="cart-card divider" style="position: relative;">
    <button class="remove-item" data-index="${index}" aria-label="Remove from cart">❌</button>
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function removeFromCart(indexToRemove) {
  let cart = getLocalStorage("so-cart") || [];

  cart.splice(indexToRemove, 1);

  setLocalStorage("so-cart", cart);
  renderCartContents();
}

renderCartContents();
