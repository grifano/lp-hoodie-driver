// Services Slider
import Splide from '@splidejs/splide';

var servicesSlides = document.getElementsByClassName('services-image-carousel');

for (var i = 0; i < servicesSlides.length; i++) {
  new Splide(servicesSlides[i], {
    arrows: false,
  }).mount();
}
