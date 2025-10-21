import { initRating } from "./rating.js";
import { products } from "../data/products.js";
import { addToCart } from "./cartActions.js";

export function renderProducts(filteredProducts = null) {
    const container = document.getElementById("products");
    const list = filteredProducts || products;

    container.innerHTML = "";

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
    initRating(stars, product.title);

    container.appendChild(div);
  });
}
