import {products} from "./products.js";
import {getCart, saveCart} from "./cartUtils.js"

const searchInput = document.getElementById("searchInput");
const productContainer = document.getElementById("products");


if (productContainer) renderProducts();
if (searchInput) searchInput.addEventListener("input", filterProducts);

function renderProducts(list = products) {
  productContainer.innerHTML = "";

  list.forEach((product, index) => {
    const div = document.createElement("div");
    div.classList.add("product-card");

    div.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <p>${product.title}</p>
        <div class="stars">
          <span class="star" data-index="0">&#9733;</span>
          <span class="star" data-index="1">&#9733;</span>
          <span class="star" data-index="2">&#9733;</span>
          <span class="star" data-index="3">&#9733;</span>
          <span class="star" data-index="4">&#9733;</span>
        </div>

      <h4>$${product.price}</h4>
      <button data-index="${index}">Add to Cart</button>
    `;

    const button = div.querySelector("button");
    button.addEventListener("click", () => addToCart(product, button));

    const stars = div.querySelectorAll(".star");
    let rating = 0;

    stars.forEach((star, i) => {
      star.addEventListener("click", () => {
        rating = i + 1;
        stars.forEach((s, j) => {
          s.innerHTML = j < rating ? "&#9733;" : "&#9734;";
        });
      });
    });

    productContainer.appendChild(div);
  });
}

function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  let filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchText)
  );
  renderProducts(filtered);
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

function addToCart(product, button) {
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
