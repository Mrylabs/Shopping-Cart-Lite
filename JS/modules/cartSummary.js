import { getDelivery } from "../utils/deliveryUtils.js";

export function updateSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    localStorage.setItem("cartTotal", cartTotal.toFixed(2));

    const delivery = getDelivery();
    const shipping = delivery ? delivery.cost : 0;
    const tax = cartTotal * 0.1;
    const total = cartTotal + shipping + tax;

    // Update DOM
    document.getElementById("item-count").textContent = totalItems;
    document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = total.toFixed(2);
}

window.addEventListener("DOMContentLoaded", updateSummary);
