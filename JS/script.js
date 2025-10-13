const productContainer = document.getElementById("products");

// Only run this if we're on the product page
if (productContainer) renderProducts();

function renderProducts() {
  productContainer.innerHTML = "";

  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.classList.add("product-card");

    div.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button data-index="${index}">Add to Cart</button>
    `;

    // Add click listener for the button
    const button = div.querySelector("button");
    button.addEventListener("click", () => addToCart(product));

    productContainer.appendChild(div);
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if item already exists
  const existingItem = cart.find(item => item.title === product.title);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to cart!`);
}
