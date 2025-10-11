const cartContainer = document.getElementById("cart");
const totalElement = document.getElementById("total");
const productContainer = document.getElementById("products");

let cart = [];
loadCart();

if (productContainer) {
  renderProducts();
}

if (cartContainer) {
  renderCart();
}


function renderProducts() {
  productContainer.innerHTML = "";

  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
      <button data-index="${index}">Add to Cart</button>
    `;

    productContainer.appendChild(div);
  });

  const buttons = productContainer.querySelectorAll("button");
  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const product = products[index];
      addToCart(product.title, product.price);
    });
  });
}

function addToCart(title, price) {
  const existingItem = cart.find(item => item.title === title);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ title, price, quantity: 1 });
  }
  saveCart();
  alert(`${title} added to cart!`);
}


function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
    totalElement.textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    const li = createCartItem(item, index);
    cartContainer.appendChild(li);
  });

  updateTotal();
}

function createCartItem(item, index) {
  const li = document.createElement("li");
  li.classList.add("cart-item");

  const titleSpan = document.createElement("span");
  titleSpan.textContent = item.title;

  const quantityContainer = document.createElement("div");
  quantityContainer.classList.add("quantity-controls");

  const minusBtn = document.createElement("button");
  minusBtn.textContent = "-";
  const quantityText = document.createElement("span");
  quantityText.textContent = item.quantity;
  const plusBtn = document.createElement("button");
  plusBtn.textContent = "+";

  const priceSpan = document.createElement("span");
  priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";

  minusBtn.addEventListener("click", () => {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
    saveCart();
    renderCart();
  });

  plusBtn.addEventListener("click", () => {
    item.quantity += 1;
    saveCart();
    renderCart();
  });

  removeBtn.addEventListener("click", () => {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  });

  quantityContainer.append(minusBtn, quantityText, plusBtn);
  li.append(titleSpan, quantityContainer, priceSpan, removeBtn);
  return li;
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalElement.textContent = total.toFixed(2);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  cart = savedCart ? JSON.parse(savedCart) : [];
}
