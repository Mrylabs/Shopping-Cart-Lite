import { renderProducts } from "./modules/productRenderer.js";
import { filterProducts } from "./modules/search.js";

function init() {
  renderProducts();

  const searchInput = document.getElementById("searchInput");
  if (searchInput) 
    searchInput.addEventListener("input", () => filterProducts(searchInput.value));
}

document.addEventListener("DOMContentLoaded", init); 
