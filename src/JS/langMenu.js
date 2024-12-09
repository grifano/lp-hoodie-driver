import { gsap } from 'gsap';

const langButtons = document.querySelectorAll('.lang-btn');

// Set the initial state with smooth transitions
langButtons.forEach(button => {
  button.style.transition =
    'background 0.15s ease, color 0.15s ease, border-color 0.15s ease'; // Ensure smooth transition for all buttons
});

// Function to handle button click
langButtons.forEach(button => {
  button.addEventListener('click', e => {
    // Clean "is-current" class for all buttons
    langButtons.forEach(langBtn => {
      langBtn.classList.remove('is-current');
    });

    // Set "is-current" for the clicked button
    button.classList.add('is-current');

    // GSAP animation for the clicked button (color and border)
    gsap.to(button, {
      duration: 0.15,
      color: '#e0cc1b', // Change text color to yellow
      borderColor: '#e0cc1b', // Change border color to yellow
      ease: 'power2.out',
    });

    // GSAP animation to reset colors for other buttons
    langButtons.forEach(langBtn => {
      if (langBtn !== button) {
        gsap.to(langBtn, {
          duration: 0.15,
          color: '#2b96ea', // Reset text color to blue
          borderColor: '#2b96ea', // Reset border color to blue
          ease: 'power2.out',
        });
      }
    });
  });
});
