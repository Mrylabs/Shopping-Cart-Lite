import { saveDelivery, getDelivery } from "../utils/deliveryUtils.js";
import { updateSummary } from "./cartSummary.js";

const dayjs = window.dayjs;

window.addEventListener("DOMContentLoaded", () => {
const radios = document.querySelectorAll('input[name="delivery"]');
const shippingSpan = document.getElementById("shipping");
const deliveryDateSpan = document.getElementById("delivery-date");
const totalSpan = document.getElementById("total");

if (!radios.length) return;

function updateDelivery(selected) {
const days = Number(selected.dataset.days);
const cost = Number(selected.dataset.cost);
const estimatedDate = dayjs().add(days, "day").format("dddd, MMM D");


deliveryDateSpan.textContent = estimatedDate;
shippingSpan.textContent = `$${cost.toFixed(2)}`;
saveDelivery({ type: selected.value, cost, days, estimatedDate });

const subtotal = Number(localStorage.getItem("cartTotal")) || 0;
totalSpan.textContent = (subtotal + cost).toFixed(2);

}

radios.forEach((radio) => {
radio.addEventListener("change", (e) => {
updateDelivery(e.target);
updateSummary();
});
});

const saved = getDelivery();
if (saved) {
const radio = document.querySelector(`input[name="delivery"][value="${saved.type}"]`);
if (radio) {
radio.checked = true;
updateDelivery(radio);
}
}
});
