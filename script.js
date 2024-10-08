// Intersection Observer Options
const options = {
  root: null, // Beobachtet den gesamten Viewport
  rootMargin: '0px', // Keine zusätzlichen Margen
  threshold: 0.05 // 5% des Elements müssen sichtbar sein, um die Animation zu triggern für die erste Sektion
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show'); // Animation auslösen
    } else {
      entry.target.classList.remove('show'); // Animation zurücksetzen, wenn es den Viewport verlässt
    }
  });
}, options);

// Alle zu beobachtenden Elemente auswählen
const animElements = document.querySelectorAll('.animate');

// Behandle die erste Sektion separat
const firstSectionElements = document.querySelectorAll('.content:first-of-type .animate');
firstSectionElements.forEach(el => observer.observe(el));

// Für die zweite Sektion, Threshold auf 0.5 setzen
const secondSectionOptions = {
  root: null, // Beobachtet den gesamten Viewport
  rootMargin: '0px', // Keine zusätzlichen Margen
  threshold: 0.5 // 50% des Elements müssen sichtbar sein, um die Animation zu triggern
};

const secondSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show'); // Animation auslösen
    } else {
      entry.target.classList.remove('show'); // Animation zurücksetzen, wenn es den Viewport verlässt
    }
  });
}, secondSectionOptions);

// Beobachte die Elemente der zweiten Sektion
const secondSectionElements = document.querySelectorAll('.content:nth-of-type(2) .animate');
secondSectionElements.forEach(el => secondSectionObserver.observe(el));
