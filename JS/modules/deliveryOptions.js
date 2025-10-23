console.log("deliveryOptions loaded");
import { saveDelivery, getDelivery } from "../utils/deliveryUtils.js";
console.log("saveDelivery imported:", saveDelivery);
const dayjs = window.dayjs;

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready, initializing delivery options...");

  const radios = document.querySelectorAll('input[name="delivery"]');
  const shippingSpan = document.getElementById("shipping");
  const deliveryDateSpan = document.getElementById("delivery-date");
  const totalSpan = document.getElementById("total");

  console.log("Found elements:", {
    radios: radios.length,
    shippingSpan: !!shippingSpan,
    deliveryDateSpan: !!deliveryDateSpan,
    totalSpan: !!totalSpan,
  });

  if (!radios.length) {
    console.error("No delivery radio buttons found!");
    return;
  }

  function updateDelivery(selected) {
    const days = Number(selected.dataset.days);
    const cost = Number(selected.dataset.cost);
    const estimatedDate = dayjs().add(days, "day").format("dddd, MMM D");

    console.log("Saving delivery:", { type: selected.value, cost, days, estimatedDate });

    deliveryDateSpan.textContent = estimatedDate;
    shippingSpan.textContent = `$${cost.toFixed(2)}`;
    saveDelivery({ type: selected.value, cost, days, estimatedDate });

    const subtotal = Number(localStorage.getItem("cartTotal")) || 0;
    totalSpan.textContent = (subtotal + cost).toFixed(2);
  }

  radios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      console.log("User selected delivery:", e.target.value);
      updateDelivery(e.target);
    });
  });

  // Restore saved delivery
  const saved = getDelivery();
  console.log("Restored from localStorage:", saved);

  if (saved) {
    const radio = document.querySelector(`input[name="delivery"][value="${saved.type}"]`);
    if (radio) {
      console.log("Found saved delivery option:", saved.type);
      radio.checked = true;
      updateDelivery(radio);
    } else {
      console.warn("Saved delivery option not found in DOM:", saved.type);
    }
  } else {
    console.log("No saved delivery found, using default.");
  }
});
