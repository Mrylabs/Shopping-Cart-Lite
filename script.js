const buttons = document.querySelectorAll("button");
const cartContainer = document.getElementById("cart");
const totalElement = document.getElementById("total");


let cart = [];

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const productDiv = button.parentElement;
    const title = productDiv.querySelector("h3").innerText;
    const price = parseFloat(productDiv.querySelector("p").innerText.replace("Price: $", ""));
    addToCart(title, price);
  });
});

function addToCart(title, price) {
  cart.push({ title, price });
  saveCart();
  renderCart();
}

function renderCart() {
  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    li.innerHTML = `
      <span>${item.title}</span>
      <span>$${item.price.toFixed(2)}</span>
      <button class="remove-btn">Remove</button>
    `;

    li.querySelector(".remove-btn")
    .addEventListener("click", () => removeFromCart(index));

    cartContainer.appendChild(li);
  });

  updateTotal();
}


function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalElement.textContent = total.toFixed(2);
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
} 
  

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  renderCart();
  }
}
loadCart();