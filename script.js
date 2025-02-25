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
const animElements = document.querySelectorAll('.animate, .animate1, .animate2, .animate3');

// Observe each element with the 'animate' class
animElements.forEach(el => observer.observe(el));

// Function to show elements one after the other and keep them visible
function showElementsSequentially(elements, delay) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('visible'); // Show the current element
    }, index * delay); // Delay based on index
  });
}

// Call the function after the page has loaded
document.addEventListener('DOMContentLoaded', () => {
  const textElements = document.querySelectorAll('.animate1, .animate2, .animate3');
  showElementsSequentially(textElements, 2000); // 2000ms = 2 seconds between each
});


// ANIMATE ENTRANCE  ENDE

// SCROLL UP NAVBAR
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Prüfe, ob die Bildschirmbreite kleiner als 1300px ist
    if (window.innerWidth < 1300) {
        if (currentScroll > lastScrollTop) {
            // Beim Runterscrollen
            navbar.style.top = '-2100px'; // Versteckt die Navbar weiter als -100px
        } else {
            // Beim Hochscrollen
            navbar.style.top = '0';
        }
    } else {
        // Standardverhalten für größere Bildschirme
        if (currentScroll > lastScrollTop) {
            navbar.style.top = '-1000px';
        } else {
            navbar.style.top = '0';
        }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
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
      images: ["img/deluxe-einzelzimmer1.jpg"
        , 
        // "img/deluxe-einzelzimmer2.jpg"
      ],
      maxGuests: 1,
  },
  "doppelzimmer": {
      title: "Doppelzimmer",
      description: "Für zwei Personen",
      basePrice: 180,
      cityViewCost: 20,
      images: ["img/doppelzimmer1.jpg",
        //  "img/doppelzimmer2.jpg"
        ],
      maxGuests: 2,
  },
  "familienzimmer": {
      title: "Familienzimmer",
      description: "Platz für bis zu 6 Personen, mit separatem Wohnbereich",
      basePrice: 220,
      cityViewCost: 20,
      images: ["img/familienzimmer1.jpg", 
        // "img/familienzimmer2.jpg"
      ],
      maxGuests: 6,
  },
  "suite": {
      title: "Suite",
      description: "Luxuriöse Ausstattung mit Whirlpool und privatem Balkon (bis 4 Personen)",
      basePrice: 300,
      cityViewCost: 20,
      images: ["img/suite1.jpg", 
        // "img/suite2.jpg", "img/suite3.jpg"
      ],
      maxGuests: 4,
  },
  "barrierefreies-zimmer": {
      title: "Barrierefreies Zimmer",
      description: "Speziell angepasst für Gäste mit eingeschränkter Mobilität (bis 5 Personen)",
      basePrice: 150,
      cityViewCost: 20,
      images: ["img/barrierefreies-zimmer1.jpg", 
        // "img/barrierefreies-zimmer2.jpg"
      ],
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
  "img/gallery1.jpg",
  "img/gallery2.jpg",
  "img/gallery3.jpg",
  "img/gallery4.jpg",
 "img/gallery5.jpg",
  "img/gallery6.jpg",
  "img/gallery7.jpg",
  "img/gallery8.jpg",
  "img/gallery9.jpg",
  "img/gallery10.jpg",
  "img/gallery11.jpg",
  "img/gallery12.jpg",
  "img/gallery13.jpg"
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


/* DROPDOWN MENU */

function toggleMenu() {
  const menu = document.querySelector("#navbar ul");
  menu.classList.toggle("show");
}

// Füge Event-Listener für Links hinzu, um das Menü bei Klick zu schließen
document.querySelectorAll("#navbar ul li a").forEach(link => {
  link.addEventListener("click", function() {
      if (window.innerWidth < 1300) {
          document.querySelector("#navbar ul").classList.remove("show");
      }
  });
});

/* DROPDOWN MENU  ENDE*/


/* CAROUSEL TEXT IN ABOUT SECTION */
document.addEventListener("DOMContentLoaded", function() {
  const items = document.querySelectorAll('.carousel-item');
  
  // Position items offscreen to start
  items[0].style.transform = 'translateY(0%)';  // Start in center
  items[1].style.transform = 'translateY(100%)'; // Start below
  items[2].style.transform = 'translateY(200%)'; // Start below the second

  // Function to rotate items
  const rotateItems = () => {
      const firstItem = items[0];
      firstItem.style.transform = 'translateY(-100%)'; // Move to top

      // Move the items
      items[1].style.transform = 'translateY(0%)'; // Middle goes to center
      items[2].style.transform = 'translateY(100%)'; // Last moves up

      // Reorder items
      setTimeout(() => {
          items[0].style.transform = 'translateY(200%)'; // Move first to bottom
          items[0].style.opacity = '0'; // Hide the first item
          items[1].style.opacity = '1'; // Show middle item
      }, 1500); // Delay for the transition duration

      // Loop the rotation
      setTimeout(rotateItems, 9000); // Total time for one rotation cycle
  };

  rotateItems(); // Start rotating items
});


/* CAROUSEL TEXT IN ABOUT SECTION ENDE */


// Exibe o conteúdo antes do vídeo
const carouselText = document.getElementById('hero-content');
const video = document.getElementById('hero-video');

// Inicialmente, ocultar o vídeo
video.style.display = 'block';

// Exibir o conteúdo
carouselText.classList.add('show');

// Função para exibir o vídeo após um tempo (ajuste o tempo conforme necessário)
setTimeout(() => {
  // Esconde o conteúdo e mostra o vídeo
  carouselText.style.display = 'none';
  video.style.display = 'block';
}, 5000); // 5000ms = 5 segundos de espera antes de mostrar o vídeo
