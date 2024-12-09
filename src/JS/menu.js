import { gsap } from 'gsap';
const burger = document.querySelector('.btn-menu');
const headerMenu = document.querySelector('[data-header-menu]');
const body = document.body;

// GSAP animation configuration
const timeline = gsap.timeline({ paused: true, reversed: true });

timeline.fromTo(
  headerMenu,
  { opacity: 0, y: -20, visibility: 'hidden' },
  { opacity: 1, y: 0, visibility: 'visible', duration: 0.3, ease: 'power2.out' }
);

function updateMenuVisibility() {
  if (window.innerWidth >= 1200) {
    // Make the menu visible and reset animation states
    body.classList.remove('menu-open');
    headerMenu.classList.add('is-active');
    gsap.set(headerMenu, { opacity: 1, y: 0, visibility: 'visible' });
  } else {
    // Ensure the menu is hidden initially when below 991px
    headerMenu.classList.remove('is-active');
    gsap.set(headerMenu, { opacity: 0, y: -20, visibility: 'hidden' });
  }
}

function getMenuOpen() {
  if (window.innerWidth < 1200) {
    const isOpen = body.classList.toggle('menu-open');
    if (isOpen) {
      timeline.play(); // Play the animation to show the menu
      headerMenu.classList.add('is-active');
    } else {
      timeline.reverse(); // Reverse the animation to hide the menu
      headerMenu.classList.remove('is-active');
    }
  }
}

// Event listeners
burger.addEventListener('click', getMenuOpen);
window.addEventListener('resize', updateMenuVisibility);

// Initialize menu visibility on page load
updateMenuVisibility();
