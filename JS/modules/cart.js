import { getCart, saveCart } from "../utils/cartUtils.js";
import { updateSummary } from "./cartSummary.js";
import { formatCurrency } from "../utils/format.js";

const cartContainer = document.getElementById("cart");
const totalElement = document.getElementById("total");

// Initialize cart rendering only if container exists
if (cartContainer) renderCart();

function renderCart() {
  const cart = getCart();
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
    totalElement.textContent = "$0.00";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    const itemTotalCents = item.priceCents * item.quantity;

    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p>${formatCurrency(itemTotalCents)}</p>
        <div class="quantity-controls">
          <button class="minus">−</button>
          <span>${item.quantity}</span>
          <button class="plus">+</button>
        </div>
      </div>
      <button class="remove">Remove</button>
    `;

    // Add event listeners for actions
    div.querySelector(".minus").addEventListener("click", () => updateQuantity(index, -1));
    div.querySelector(".plus").addEventListener("click", () => updateQuantity(index, 1));
    div.querySelector(".remove").addEventListener("click", () => removeItem(index));

    cartContainer.appendChild(div);
  });

  updateTotal(cart);
  updateSummary();
}

function updateQuantity(index, change) {
  const cart = getCart();
  const item = cart[index];

  if (!item) return; // safety check

  item.quantity += change;

  if (item.quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function updateTotal(cart) {
  const totalCents = cart.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  );
  totalElement.textContent = formatCurrency(totalCents);
}
