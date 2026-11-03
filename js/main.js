

$(function () {

  /*=================================================
  ハンバーガ―メニュー home reason contact
  ===================================================*/
  // ハンバーガーメニューをクリックした時
  $(".toggle-btn").on("click", function () {
    $("header").toggleClass("open");
  });
  // メニューのリンクをクリックした時
  $(".nav a").on("click", function () {
    $("header").toggleClass("open");
  });



  /*=================================================
  top-mainvisual フェード
  ===================================================*/

  const $heroSlider = $(".bg-slider");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if ($heroSlider.length) {
    $heroSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 0,
      infinite: true,
      arrows: false,
      dots: false,
      fade: true,
      speed: reducedMotion.matches ? 0 : 1000,
      cssEase: "ease-in-out",
      autoplay: !reducedMotion.matches,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      pauseOnFocus: true,
    });

    reducedMotion.addEventListener("change", function (event) {
      $heroSlider.slick("slickSetOption", "speed", event.matches ? 0 : 1000);
      $heroSlider.slick(event.matches ? "slickPause" : "slickPlay");
    });
  }

  function setupMobileFadeSlider(selector, options = {}) {
    const $slider = $(selector);

    if (!$slider.length) return;

    function toggleSlider() {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const isInitialized = $slider.hasClass("slick-initialized");

      if (isMobile && !isInitialized) {
        $slider.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          speed: 800,
          cssEase: "ease-in-out",

          autoplay: true,
          autoplaySpeed: 3000,
          infinite: true,

          arrows: false,
          dots: false,
          ...options,
        });
      }

      if (!isMobile && isInitialized) {
        $slider.slick("unslick");
      }
    }

    toggleSlider();
    $(window).on("resize", toggleSlider);
  }


  /* ABOUT：施工写真 */
  setupMobileFadeSlider(".next-era-photo");

  /* COMPANY */
  setupMobileFadeSlider(".company-photo");

  /* RECRUIT */
  setupMobileFadeSlider(".recruit-image");





  /*=================================================
   worksshingle 選択した画像を緑に
   ===================================================*/
  $(document).on("click", ".works-grid .thumbnail", function () {
    //クリックした画像のsrcを取得
    const image = $(this).find('img').attr('data-full');

    $("#worksshingle-contents-photo")
      .attr("src", image)
      .removeAttr("srcset")
      .removeAttr("sizes");

    $(".works-grid .thumbnail").removeClass("active");
    $(this).addClass("active");

  })

  /*=================================================
  worksshingle スマホサムネイル
  ===================================================*/

  $(document).on("click", ".works-thumb-prev", function () {
    const grid = $(this).siblings(".works-grid").get(0);

    grid.scrollBy({
      left: -grid.clientWidth,
      behavior: "smooth",
    });
  });

  $(document).on("click", ".works-thumb-next", function () {
    const grid = $(this).siblings(".works-grid").get(0);

    grid.scrollBy({
      left: grid.clientWidth,
      behavior: "smooth",
    });
  });



  /*=================================================
 アコーディオン
 ===================================================*/

  //.accordion_oneの中の.accordion_headerがクリックされたら
  $('.recruit-faq-list .faq-button').click(function () {
    $(this).closest('dt').next('.faq-answer').slideToggle();
  });
});














/* スマホメニューの開閉 */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-navigation');
  if (!toggle || !navigation) return;

  const label = toggle.querySelector('.menu-toggle__label');
  const pageContent = document.querySelectorAll('#main, .site-footer, .site-header > .brand');

  const setMenuOpen = (isOpen) => {
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    if (label) {
      label.textContent = isOpen ? 'CLOSE' : 'MENU';
      label.setAttribute('lang', 'en');
    }
    navigation.classList.toggle('is-open', isOpen);
    document.documentElement.classList.toggle('menu-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    // メニューの背面にあるリンクへ、フォーカスが移らないようにする
    pageContent.forEach((element) => {
      element.inert = isOpen;
    });
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') !== 'true';
    setMenuOpen(isOpen);
    if (isOpen) navigation.querySelector('a[href]')?.focus({ preventScroll: true });
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a[href]')) setMenuOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;

    if (event.key === 'Escape') {
      setMenuOpen(false);
      toggle.focus();
    }

    // Tabキーの移動先を、開いているメニューと閉じるボタンに限定
    if (event.key === 'Tab') {
      const firstItem = toggle;
      const lastItem = [...navigation.querySelectorAll('a[href]')].pop();

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem?.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }
  });

  window.matchMedia('(min-width: 768px)').addEventListener('change', () => {
    const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(false);
    if (wasOpen) document.querySelector('.site-header > .brand')?.focus();
  });
})();

