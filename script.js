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




// ROOM TYPES DATA
// Room data with base prices
const rooms = {
  "deluxe-einzelzimmer": {
      title: "Deluxe Einzelzimmer",
      description: "Mit großem Bett und Stadtblick (max. 1 Person)",
      basePrice: 120,
      cityViewCost: 20,
      images: ["img/deluxe-einzelzimmer1.jpg", "img/deluxe-einzelzimmer2.jpg"],
      maxGuests: 1,
  },
  "doppelzimmer": {
      title: "Doppelzimmer",
      description: "Für zwei Personen",
      basePrice: 180,
      cityViewCost: 20,
      images: ["img/doppelzimmer1.jpg", "img/doppelzimmer2.jpg"],
      maxGuests: 2,
  },
  "familienzimmer": {
      title: "Familienzimmer",
      description: "Platz für bis zu 6 Personen, mit separatem Wohnbereich",
      basePrice: 220,
      cityViewCost: 20,
      images: ["img/familienzimmer1.jpg", "img/familienzimmer2.jpg"],
      maxGuests: 6,
  },
  "suite": {
      title: "Suite",
      description: "Luxuriöse Ausstattung mit Whirlpool und privatem Balkon (bis 4 Personen)",
      basePrice: 300,
      cityViewCost: 20,
      images: ["img/suite1.jpg", "img/suite2.jpg", "img/suite3.jpg"],
      maxGuests: 4,
  },
  "barrierefreies-zimmer": {
      title: "Barrierefreies Zimmer",
      description: "Speziell angepasst für Gäste mit eingeschränkter Mobilität (bis 5 Personen)",
      basePrice: 150,
      cityViewCost: 20,
      images: ["img/barrierefreies-zimmer1.jpg", "img/barrierefreies-zimmer2.jpg"],
      maxGuests: 5,
  },
};

// Show room popup on click
document.querySelectorAll('.room-item').forEach(item => {
  item.addEventListener('click', () => {
      const roomType = item.getAttribute('data-room');
      const roomData = rooms[roomType];

      // Update popup content
      document.getElementById('room-title').innerText = roomData.title;
      document.getElementById('room-description').innerText = roomData.description;
      updateRoomGallery(roomData.images);
      setInitialPrice(roomData.basePrice);

      // Show popup
      togglePopup(true);

      // Reset form inputs
      resetForm(roomType);
  });
});

// Function to update room gallery images
function updateRoomGallery(images) {
  const gallery = document.getElementById('room-gallery');
  gallery.innerHTML = '';
  images.forEach(imgSrc => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = imgSrc.split('/').pop(); // Use the image file name as alt text
      gallery.appendChild(img);
  });
}

// Function to set the initial price in the popup
function setInitialPrice(basePrice) {
  document.getElementById('room-price').innerText = `${basePrice} € pro Nacht`;
}

// Reset form inputs based on room type
function resetForm(roomType) {
  document.getElementById('city-view').value = 'no';
  document.getElementById('guest-count').value = 1;
  document.getElementById('guest-count').max = rooms[roomType].maxGuests;

  const bedSelectionContainer = document.getElementById('bed-selection-container');
  bedSelectionContainer.style.display = roomType === 'doppelzimmer' ? 'block' : 'none';
}

// Update price on input change
document.getElementById('city-view').addEventListener('change', updatePrice);
document.getElementById('guest-count').addEventListener('input', updatePrice);

function updatePrice() {
  const roomType = document.querySelector('.room-item.active')?.getAttribute('data-room');
  const roomData = rooms[roomType];
  const cityView = document.getElementById('city-view').value === 'yes' ? roomData.cityViewCost : 0;
  const guestCount = parseInt(document.getElementById('guest-count').value) || 0;

  // Calculate total price
  const totalPrice = roomData.basePrice + cityView;
  document.getElementById('room-price').innerText = `${totalPrice} € pro Nacht`;
}

// Toggle the visibility of the popup
function togglePopup(isVisible) {
  document.getElementById('room-popup').classList.toggle('active', isVisible);
  document.getElementById('room-popup-overlay').classList.toggle('active', isVisible);
}

// Close popup
document.getElementById('close-room-popup').addEventListener('click', () => {
  togglePopup(false);
});


// ROOM TYPES DATA ENDE


// POPUP GALLLERY
const galleryImages = [
  "img/barrierefreies-zimmer1.jpg",
  "img/barrierefreies-zimmer2.jpg",
  "img/deluxe-einzelzimmer1.jpg",
  "img/deluxe-einzelzimmer2.jpg",
  "img/doppelzimmer1.jpg",
  "img/doppelzimmer2.jpg",
  "img/exotic-spa.jpg",
  "img/familienzimmer1.jpg",
  "img/familienzimmer2.jpg",
  "img/familienzimmer3.jpg",
  "img/hotel-389256_1280.jpg",
  "img/hotel-6862159_1280.jpg",
  "img/hotel-7885138_1280.jpg",
  "img/hotel-photo.jpeg",
  "img/hotel-photo2.jpeg",
  "img/hotel-photo3.jpeg",
  "img/hotel-photo4.jpeg",
  "img/hotel-photo5.jpeg",
  "img/hotel-photo6.jpeg",
  "img/hotel-photo7.jpeg",
  "img/hotel-photo8.jpeg",
  "img/hotel-photo9.jpeg",
  "img/hotel-reception.jpg",
  "img/lobby-398845_1280.jpg",
  "img/pool-7245866_1280.jpg",
  "img/receptionists.jpg",
  "img/rooms.jpg",
  "img/suite1.jpg",
  "img/suite2.jpg",
  "img/suite3.jpg",
  "img/villa-1737168_1280.jpg",
  "img/woman-4373078_1280.jpg"
];

let currentIndex = 0; // To track the current image index

function openGalleryPopup(index) {
  if (index < 0 || index >= galleryImages.length) {
      console.error('Index out of bounds!'); // Error log for invalid index
      return; // Exit the function if the index is invalid
  }

  currentIndex = index; // Set the current index to the clicked image
  const popup = document.getElementById('gallery-popup');
  const popupImage = document.getElementById('popup-image');
  popupImage.src = galleryImages[currentIndex]; // Set the source of the popup image
  popup.classList.add('active'); // Show the popup
}

function closeGalleryPopup() {
  const popup = document.getElementById('gallery-popup');
  popup.classList.remove('active'); // Hide the popup
}

function changeImage(direction) {
  currentIndex += direction; // Change the current index based on direction
  
  // Loop back to the beginning or end of the gallery
  if (currentIndex < 0) {
      currentIndex = galleryImages.length - 1; // Go to the last image
  } else if (currentIndex >= galleryImages.length) {
      currentIndex = 0; // Go to the first image
  }

  const popupImage = document.getElementById('popup-image');
  popupImage.src = galleryImages[currentIndex]; // Update the popup image source
}

// POPUP GALLLERY ENDE