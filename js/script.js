(function () {
  `use strict`;

  const header = document.querySelector("header");
  let lastScrollY = 0;
  let currentOpacity = 1;
  const fadeRange = 80; // この距離（px）で完全に表示/非表示

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY;

    if (delta > 0) {
      // 下スクロール → 消す
      currentOpacity = Math.max(0, currentOpacity - delta / fadeRange);
    } else {
      // 上スクロール → 出す
      currentOpacity = Math.min(1, currentOpacity - delta / fadeRange);
    }

    header.style.opacity = currentOpacity;
    lastScrollY = scrollY;
  });
})();
