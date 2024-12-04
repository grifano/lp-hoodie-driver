import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-futures-item', {
  x: -100, // Start offset to the left
  opacity: 0, // Start invisible
  duration: 1, // Animation duration for each item
  stagger: 0.2, // Delay between each item’s animation
  ease: 'power2.out', // Easing function

  scrollTrigger: {
    trigger: '.hero-futures-item', // Target element to watch for entering viewport
    start: 'top 80%', // Trigger animation when item reaches 80% of the viewport height
    toggleActions: 'play none none none', // Only play the animation when entering
  },
});
