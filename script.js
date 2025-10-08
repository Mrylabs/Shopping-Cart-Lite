const cartContainer = document.getElementById("cart");
const totalElement = document.getElementById("total");
const productContainer = document.getElementById("products");

const products = [
  {
    title: "Headphones",
    price: 199,
    img: "https://m.media-amazon.com/images/I/61kFL7ywsZS._AC_SY355_.jpg"
  },
  {
    title: "Phone",
    price: 999.99,
    img: "https://m.media-amazon.com/images/I/71KGkQ+KOKL._AC_SX425_.jpg"
  },
  {
    title: "Laptop",
    price: 699,
    img: "https://m.media-amazon.com/images/I/71vdSXbETlL._AC_UY218_.jpg"
  },
  {
    title: "Smart Watch",
    price: 249,
    img: "https://m.media-amazon.com/images/I/71MHu1Rtu0L._AC_SX569_.jpg"
  }
];

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

renderProducts();


let cart = [];

loadCart();
renderCart();

function addToCart(title, price) {
  const existingItem = cart.find(item => item.title === title);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ title, price, quantity: 1 });
  }
  saveCart();
  renderCart();
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
  titleSpan.textContent = `${item.title} ${item.quantity}`;

  const priceSpan = document.createElement("span");
  const itemTotal = item.price * item.quantity;
  priceSpan.textContent = `$${itemTotal.toFixed(2)}`;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");
  removeBtn.addEventListener("click", () => removeFromCart(index));

  li.append(titleSpan, priceSpan, removeBtn);
  return li;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
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
