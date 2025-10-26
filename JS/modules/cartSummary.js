import { getDelivery } from "../utils/deliveryUtils.js";
import { formatCurrency } from "../utils/format.js";

export function updateSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotalCents = cart.reduce(
        (sum, item) => sum + item.priceCents * item.quantity, 0);
    localStorage.setItem("cartTotalCents", cartTotalCents);

    const delivery = getDelivery();
    const shippingCents = delivery ? delivery.costCents : 0;

    const taxCents = Math.round(cartTotalCents * 0.1);
    const totalCents = cartTotalCents + shippingCents + taxCents;

    document.getElementById("item-count").textContent = totalItems;
    document.getElementById("shipping").textContent = formatCurrency(shippingCents);
    document.getElementById("tax").textContent = formatCurrency(taxCents);
    document.getElementById("total").textContent = formatCurrency(totalCents);
}

window.addEventListener("DOMContentLoaded", updateSummary);
