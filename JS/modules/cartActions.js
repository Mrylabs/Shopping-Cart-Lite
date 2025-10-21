import { getCart, saveCart } from "../utils/cartUtils.js";

export function addToCart(product, button) {
  let cart = getCart();

  const existingItem = cart.find(item => item.title === product.title);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  showAddedMessage(button);

}

function showAddedMessage(button) {
  if (button.parentElement.querySelector(".added-msg")) return;

  const msg = document.createElement("span");
  msg.classList.add("added-msg");
  msg.innerHTML = `<input type="checkbox" checked> Added.`;

  button.parentElement.appendChild(msg);

  setTimeout(() => {
    msg.classList.add("fade-out");
    setTimeout(() => {
      msg.remove();
    }, 500);
  }, 2000);
}