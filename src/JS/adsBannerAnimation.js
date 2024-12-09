import { gsap } from 'gsap';

// Select the caption element
const caption = document.querySelector('.header-top-caption');

// Wrap each letter with a <span> if not already done
const text = caption.textContent;
caption.innerHTML = text
  .split('')
  .map(letter => `<span class="letter">${letter}</span>`)
  .join('');

// GSAP animation for the letters coming from the bottom
gsap.fromTo(
  '.letter',
  {
    y: 20, // Start position (bottom, 20px down)
    opacity: 0, // Make them initially invisible
  },
  {
    y: 0, // End position (normal position)
    opacity: 1, // Make them fully visible
    duration: 0.2, // Duration of each animation
    stagger: 0.03, // Delay each letter's animation (0.03s)
    ease: 'power2.out', // Easing for smooth animation
    repeat: -1, // Infinite repetition
    repeatDelay: 1, // Delay before the animation repeats (1 second)
  }
);
