import { products } from "../data/products.js";
import { renderProducts } from "./productRenderer.js";

export function filterProducts(searchText) {
  const text = searchText.toLowerCase();
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(text)
  );
  renderProducts(filtered);
}