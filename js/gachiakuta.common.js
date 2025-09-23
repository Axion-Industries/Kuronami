'use strict';
const $body = document.querySelector('body');
document.addEventListener('DOMContentLoaded', () => {
  On.ready();
});

window.addEventListener('load', () => {
  On.load();
});
window.addEventListener('resize', () => {
  On.resize();
});

const On = {
  ready() {
    $body.classList.add('is-ready');

    Scroll.init();
  },
  load() {
    $body.classList.add('is-load');

    setTimeout(function () {
      $body.classList.add('is-load-end');
    }, 1000);

    scrollEffect.init();
    Scroll.init();

    Menu.init();
    Modal.init();
    lang.init();

    height.init();
  },
  resize() {
    Menu.height();
    height.init();
  },
};

const height = {
  set() {
    document.querySelectorAll('.js-height').forEach(($item) => {
      $item.style.height = ''.concat(window.innerHeight, 'px');
    });
  },
  init() {
    this.set();
  },
};
const lang = {
  set() {
    // let langParam = new URLSearchParams(location.search).get('lang');
    // if (langParam) {
    //   document.body.dataset.lang = `${langParam}`;
    // }

    document.querySelectorAll('.js-change-lang').forEach(($elm) => {
      $elm.addEventListener('click', function () {
        let lang = $elm.dataset.langLink;
        let url = new URL(window.location);
        let search = url.search;
        let hash = url.hash;
        document.querySelectorAll('[data-lang-item="'.concat(lang, '"] .js-character-slide-pagination')).forEach(($item) => {
          $item.classList.remove('is-current');
        });
        if (lang === 'en') {
          history.replaceState('', '', '/en'.concat(url.pathname).concat(search).concat(hash));
          if (document.querySelectorAll('.js-chara_detail').length) {
            charaSlide.instance[1].slideTo(charaSlide.instance[0].activeIndex);
            document.querySelectorAll('[data-lang-item="'.concat(lang, '"] .js-character-slide-pagination')).forEach(($elm) => {
              $elm.classList.remove('is-current');
            });
            document.querySelectorAll('[data-lang-item="'.concat(lang, '"] [data-character-index="').concat(charaSlide.instance[1].realIndex + 1, '"]'))[0].classList.add('is-current');
          }
        } else {
          history.replaceState('', '', '/'.concat(url.pathname.replace('/en/', '')).concat(search).concat(hash));
          if (document.querySelectorAll('.js-chara_detail').length) {
            charaSlide.instance[0].slideTo(charaSlide.instance[1].activeIndex);
            document.querySelectorAll('[data-lang-item="'.concat(lang, '"] .js-character-slide-pagination')).forEach(($elm) => {
              $elm.classList.remove('is-current');
            });
            document.querySelectorAll('[data-lang-item="'.concat(lang, '"] [data-character-index="').concat(charaSlide.instance[0].realIndex + 1, '"]'))[0].classList.add('is-current');
          }
        }

        document.body.dataset.lang = ''.concat(lang);
      });
    });
  },
  init() {
    this.set();
  },
};

const Scroll = {
  instance: null,
  set() {
    this.instance = new SCROLL_MODULE('[data-scroll]', {
      duration: 800,
      easing: SCROLL_MODULE.easeOutQuart,
      offset: 0,
    });
  },
  init() {
    this.set();
  },
};

const Menu = {
  set() {
    document.querySelectorAll('.js-menu-btn').forEach(($item) => {
      $item.addEventListener('click', () => {
        document.body.classList.toggle('is-menu-open');
      });
    });
    document.querySelectorAll('.js-menu-link').forEach(($item) => {
      $item.addEventListener('click', (e) => {
        document.body.classList.remove('is-menu-open');
        Scroll.instance.anime(e.currentTarget.dataset.link, 1000);
      });
    });
    if (location.search) {
      const urlParams = new URL(window.location.href).searchParams;
      if (urlParams.has('target')) {
        const target = urlParams.get('target');
        Scroll.instance.anime('.p-'.concat(target), 1000);
      }
    }
  },
  height() {
    if (document.querySelectorAll('.l-header__menu-content-deco').length >= 1) {
      document.querySelectorAll('.l-header__menu-content-deco')[0].style.minHeight = ''.concat(document.querySelectorAll('.l-header__menu-content-block')[0].clientHeight, 'px');
    }
  },
  init() {
    this.height();
    Menu.set();
  },
};

const Modal = {
  instance: null,
  set() {
    const _template_function_advanced = function (type, data, dataAll, elemOpen, elem) {
      let _html = '';
      if (type === 'img') {
        _html =
          "<section class='m-modal {{ defaultClassName }} --img' id='{{ id }}' data-modal-type>\n      <div class='m-modal__bg'>\n        <div class='m-modal__bg-deco'></div>\n      </div>\n      <div class='m-modal__close-btn' data-modal-ui-close>\n        <img src=\"/assets/img/common/menu/btn_menu_bg_2.png\" alt=\"\">\n      </div>\n      <div class='m-modal__content'>\n        {{ content }}\n      </div>\n    </section>";
      } else if (type === 'youtube') {
        _html =
          "<section class='m-modal {{ defaultClassName }} --movie' id='{{ id }}' data-modal-type>\n      <div class='m-modal__bg'>\n        <div class='m-modal__bg-deco'></div>\n      </div>\n      <div class='m-modal__close-btn' data-modal-ui-close>\n        <img src=\"/assets/img/common/menu/btn_menu_bg_2.png\" alt=\"\">\n      </div>\n      <div class='m-modal__content'>\n        {{ content }}\n      </div>\n    </section>";
      }
      if (type === '.p-character_modal') {
        _html =
          "<section class='m-modal {{ defaultClassName }} --character' id='{{ id }}' data-modal-type>\n      <div class='m-modal__bg'>\n      </div>\n      <div class='m-modal__close-btn' data-modal-ui-close>\n        <img src=\"/assets/img/chara/btn_close_bg.png\" alt=\"\">\n      </div>\n      <div class='m-modal__content'>\n        {{ content }}\n      </div>\n    </section>";
      } else {
        _html =
          "<section class='m-modal {{ defaultClassName }} --img' id='{{ id }}' data-modal-type>\n      <div class='m-modal__bg'>\n        <div class='m-modal__bg-deco'></div>\n      </div>\n      <div class='m-modal__close-btn' data-modal-ui-close>\n        <img src=\"/assets/img/common/menu/btn_menu_bg_2.png\" alt=\"\">\n      </div>\n      <div class='m-modal__content'>\n        {{ content }}\n      </div>\n    </section>";
      }
      return _html;
    };
    this.instance = new MODAL_MODULE({
      duration: 400,
      removeWrapperTag: false,
      defaultModalStyle: true,
      defaultClassName: 'm-modal-custom',
      customModalHtml: _template_function_advanced,
    });
  },
  init() {
    Modal.set();
  },
};

const scrollEffect = {
  instance: null,
  set() {
    this.instance = new SCROLL_EFFECT_MODULE({
      elem: '[data-scroll-effect]',
    });
  },
  init() {
    scrollEffect.set();
  },
};
