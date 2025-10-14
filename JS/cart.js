import {getCart, saveCart} from "./cartUtils.js";

const cartContainer = document.getElementById("cart");
const totalElement = document.getElementById("total");

if (cartContainer) renderCart();

function renderCart() {
  let cart = getCart();
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
    totalElement.textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p>$${(item.price * item.quantity).toFixed(2)}</p>
        <div class="quantity-controls">
          <button class="minus">-</button>
          <span>${item.quantity}</span>
          <button class="plus">+</button>
        </div>
      </div>
      <button class="remove">Remove</button>
    `;

    const minusBtn = div.querySelector(".minus");
    const plusBtn = div.querySelector(".plus");
    const removeBtn = div.querySelector(".remove");

    minusBtn.addEventListener("click", () => updateQuantity(index, -1));
    plusBtn.addEventListener("click", () => updateQuantity(index, 1));
    removeBtn.addEventListener("click", () => removeItem(index));

    cartContainer.appendChild(div);
  });

  updateTotal(cart);
}

function updateQuantity(index, change) {
  let cart = getCart();
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function updateTotal(cart) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalElement.textContent = total.toFixed(2);
}
