const buttons = document.querySelectorAll("button");
const cartContainer = document.getElementById("cart");
const totalElement = document.getElementById("total");


let cart = [];

loadCart();
renderCart();

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const productDiv = button.parentElement;
    const title = productDiv.querySelector("h3").innerText;
    const price = parseFloat(productDiv.querySelector("p").innerText.replace("Price: $", ""));
    addToCart(title, price);
  });
});

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
  titleSpan.textContent = `${item.title} (x${item.quantity})`;


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
