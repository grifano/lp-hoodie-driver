import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const gallerySliderTop = new Splide('.gallery-slider.is-top', {
  type: 'loop',
  // drag: 'free',
  arrows: false,
  pagination: false,
  gap: 16,
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
const gallerySliderBottom = new Splide('.gallery-slider.is-bottom', {
  type: 'loop',
  drag: 'free',
  arrows: false,
  pagination: false,
  gap: 16,
  perPage: 4,
  autoScroll: {
    speed: -1,
    pauseOnHover: false,
  },
  // mediaQuery: 'min',
  breakpoints: {
    550: {
      perPage: 2,
      autoScroll: {
        speed: -0.5,
        pauseOnHover: false,
      },
    },
    768: {
      perPage: 3,
      autoScroll: {
        speed: -0.8,
        pauseOnHover: false,
      },
    },
  },
});

gallerySliderTop.mount({ AutoScroll });
gallerySliderBottom.mount({ AutoScroll });
