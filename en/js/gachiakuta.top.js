'use strict';
window.addEventListener('load', () => {
  movieBg.init();
  bannerSlide.init();
});

const movieBg = {
  id: '',
  set() {
    this.id = document.querySelector('.js-movie-bg').dataset.movieId;
    const PMY = new PLAYER_MODULE_YOUTUBE({
      id: 'youtubePlayer',
      videoid: this.id,
      ui_clickable: false,
      responsive: true,
      muted: true,
      loop: true,
      playerVars: {
        autoplay: 1,
      },
    });
  },
  init() {
    if (document.querySelector('.js-movie-bg')) this.set();
  },
};

const bannerSlide = {
  set() {
    new Swiper('.js-banner-slide', {
      speed: 1000,
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.js-banner-slide-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<div class="p-in-item '.concat(
            className,
            '">\n              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">\n                <path d="M1240.03,1969.18l-13.85,13.85-16.15-16.15-16.15,16.15-13.85-13.85,16.16-16.15-16.16-16.15,13.85-13.85,16.15,16.16,16.15-16.16,13.85,13.85-16.16,16.15Z" transform="translate(-1180.03 -1923.03)"/>\n              </svg>\n            </div>\n            '
          );
        },
      },
      spaceBetween: 20,
      breakpoints: {
        900: {
          spaceBetween: 30,
        },
      },
    });
  },
  init() {
    if (document.querySelectorAll('.p-banner__main-list-item').length > 1) {
      this.set();
    }
  },
};
