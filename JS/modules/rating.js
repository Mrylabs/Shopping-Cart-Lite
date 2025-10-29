export function initRating(stars, productId) {
  if (!productId) return; // safety check
  
  // Always load fresh snapshot of ratings
  let savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};

  // Make sure product has an entry (default = 0)
  if (savedRatings[productId] === undefined) {
    savedRatings[productId] = 0;
    localStorage.setItem("ratings", JSON.stringify(savedRatings));
  }

  let rating = savedRatings[productId];
  updateStars(stars, rating);

  stars.forEach((star, i) => {
    star.addEventListener("mouseenter", () => updateStars(stars, i + 1));
    star.addEventListener("mouseleave", () => updateStars(stars, rating));

    star.addEventListener("click", () => {
      rating = i + 1;
      savedRatings[productId] = rating;
      localStorage.setItem("ratings", JSON.stringify(savedRatings));
      updateStars(stars, rating);
      console.log(`Saved rating for ${productId}:`, rating);
    });
  });
}

function updateStars(stars, activeCount) {
  stars.forEach((s, j) => {
    s.innerHTML = j < activeCount ? "&#9733;" : "&#9734;";
  });
}
