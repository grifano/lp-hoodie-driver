import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const reviewsSlider = new Splide('.reviews-slider', {
  type: 'loop',
  drag: 'free',
  arrows: false,
  pagination: false,
  gap: 32,
  perPage: 4,
  autoScroll: {
    speed: 1,
    pauseOnHover: false,
  },
  // mediaQuery: 'min',
  breakpoints: {
    550: {
      perPage: 2,
      autoScroll: {
        speed: 0.5,
        pauseOnHover: false,
      },
    },
    768: {
      perPage: 3,
      autoScroll: {
        speed: 0.8,
        pauseOnHover: false,
      },
    },
  },
});

reviewsSlider.mount({ AutoScroll });
