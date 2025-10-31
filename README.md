# 🛒 Shopping Cart Lite

A lightweight e-commerce front-end project built with **vanilla JavaScript**, **HTML**, and **CSS**.
It features product rendering, a dynamic shopping cart, delivery options, and localStorage-based data persistence — all modularized into reusable components.

---

## 🚀 Features

* **Product Listing** – Displays a collection of products dynamically rendered from JS modules.
* **Search Filter** – Allows real-time filtering of products by name.
* **Add to Cart** – Fully functional cart system with quantity updates and removal options.
* **Order Summary** – Displays subtotal, delivery cost, tax, and total dynamically.
* **Delivery Options** – Lets users choose different shipping speeds and see estimated dates.
* **Persistent Data** – Uses `localStorage` to save cart and delivery selections across page reloads.

---

## 🧩 What I Learned

This project was a major step forward in my JavaScript learning journey.
I built everything modularly — from product rendering to cart logic — and discovered how separate files can work together cleanly through ES6 module imports.

I also learned how to manage persistent data using **localStorage** — reading, writing, and syncing information between different pages (like the product and cart pages).
That experience helped me understand how frontend state management works at a basic level.

Working through problems like DOM manipulation, data synchronization, and event-driven logic taught me a lot about structuring real-world web apps.

Lastly, this project was a follow-up to an earlier tutorial-based Amazon clone I built.
This time, I built everything from scratch — applying the concepts I’d learned — to reinforce my understanding and deepen my hands-on experience.

---

## 🧠 Next Steps

* Refactor CSS for better responsive design.
* Practice modularization with more examples.
* Experiment with frameworks like **Tailwind CSS** or **React** in future iterations.

---

## 📁 Project Structure

📦 Shopping-Cart-Lite
├── index.html
├── cart.html
├── styles.css
├── js/
│   ├── data/
│   │   └── products.js
│   ├── modules/
│   │   ├── cart.js
│   │   ├── cartActions.js
│   │   ├── cartSummary.js
│   │   ├── deliveryOptions.js
│   │   ├── productRenderer.js
│   │   ├── rating.js
│   │   └── search.js
│   ├── utils/
│   │   ├── cartUtils.js
│   │   ├── deliveryUtils.js
│   │   └── format.js
│   └── main.js


---

## 💬 Reflection

This project pushed me to think more like a developer — breaking problems down, debugging persistency issues, and connecting multiple parts of an application.
It wasn’t always easy (especially `localStorage` 😅), but solving those challenges made everything click.
