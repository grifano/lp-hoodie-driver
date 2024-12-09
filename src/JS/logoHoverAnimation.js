import { gsap } from 'gsap';
document.addEventListener('DOMContentLoaded', () => {
  // Media query check
  const mediaQuery = window.matchMedia('(min-width: 1200px)');

  if (mediaQuery.matches) {
    const logoElement = document.querySelector('.logo');

    if (logoElement) {
      // Add hover animation
      logoElement.addEventListener('mouseenter', () => {
        gsap.to(logoElement.querySelector('.logo-icon'), {
          rotationY: 360, // Full rotation on X-axis
          duration: 1,
          ease: 'power2.out',
        });
      });

      logoElement.addEventListener('mouseleave', () => {
        gsap.to(logoElement.querySelector('.logo-icon'), {
          rotationY: 0, // Reset to original position
          duration: 1,
          ease: 'power2.in',
        });
      });
    }
  }
});
