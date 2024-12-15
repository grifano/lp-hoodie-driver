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
  },
  // mediaQuery: 'min',
  breakpoints: {
    550: {
      perPage: 2,
      autoScroll: {
        speed: 0.5,
      },
    },
    768: {
      perPage: 3,
      autoScroll: {
        speed: 0.8,
      },
    },
  },
});

reviewsSlider.mount({ AutoScroll });
