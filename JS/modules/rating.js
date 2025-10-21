export function initRating(stars, productTitle) {
    let saveRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    let rating = saveRatings[productTitle] || 0;

    updateStars(stars, rating);
    

    stars.forEach((star, i) => {
      star.addEventListener("mouseenter", () => updateStars(stars, i + 1));
      star.addEventListener("mouseleave", () => updateStars(stars, rating));

      star.addEventListener("click", () => {
        rating = i + 1;
        saveRatings[productTitle] = rating;
        localStorage.setItem("ratings", JSON.stringify(saveRatings));
        updateStars(stars, rating);
      });
    });
}
function updateStars(stars, activeCount) {
    stars.forEach((s, j) => {
    s.innerHTML = j < activeCount ? "&#9733;" : "&#9734;";
    });
}
