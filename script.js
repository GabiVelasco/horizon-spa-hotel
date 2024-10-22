// Unified Intersection Observer Options
const options = {
  root: null, // Observing the entire viewport
  rootMargin: '0px', // No extra margins
  threshold: [0.005, 0.5] // 0.5% to 50% of the element needs to be visible to trigger
};

// Create a single IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // Add class to trigger animation
    } else {
      entry.target.classList.remove('visible'); // Remove class to reset animation
    }
  });
}, options);

// Select all elements with the 'animate' class
const animElements = document.querySelectorAll('.animate');

// Observe each element with the 'animate' class
animElements.forEach(el => observer.observe(el));

