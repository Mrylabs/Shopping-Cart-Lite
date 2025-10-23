const DELIVERY_KEY = "delivery";

export function getDelivery() {
  return JSON.parse(localStorage.getItem(DELIVERY_KEY)) || null;
}

export function saveDelivery(option) {
  localStorage.setItem(DELIVERY_KEY, JSON.stringify(option));
}

export function clearDelivery() {
  localStorage.removeItem(DELIVERY_KEY);
}
