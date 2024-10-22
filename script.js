// ANIMATE ENTRANCE 
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
// ANIMATE ENTRANCE  ENDE

// SCROLL UP NAVBAR
let lastScrollTop = 0; // Variable to hold the last scroll position
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop; // Get current scroll position

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        navbar.style.top = '-100px'; // Hide the navbar (adjust the value if needed)
    } else {
        // Scrolling up
        navbar.style.top = '0'; // Show the navbar
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});
// SCROLL UP NAVBAR ENDE

// BOOKING POPUP
// Show booking popup
const bookingBtn = document.getElementById('booking-btn');
const popup = document.getElementById('booking-popup');
const popupOverlay = document.getElementById('popup-overlay');
const closePopup = document.getElementById('close-popup');

bookingBtn.addEventListener('click', () => {
    popup.classList.add('active');
    popupOverlay.classList.add('active');
});

closePopup.addEventListener('click', () => {
    popup.classList.remove('active');
    popupOverlay.classList.remove('active');
});

popupOverlay.addEventListener('click', () => {
    popup.classList.remove('active');
    popupOverlay.classList.remove('active');
});
// BOOKING POPUP ENDE

