// でかい部屋
document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("roomSvg");

  // SVG内の全ての描画エレメントを取得
  // 取得対象を「ページ内の全てのSVGの要素」に変更
  const targets = document.querySelectorAll(
    "svg path, svg polygon, svg line, svg polyline, svg rect, svg circle"
  );

  // targetsの内容が1つもなかったら終了
  if (targets.length === 0) return;

  // 1. SVG全体の中心座標（バウンディングボックス中心）を算出
  const svgBox = svg.getBoundingClientRect();
  // SVGが画面上のどこにあって、どのくらいの大きさなのかを取得している。
  // その情報をsvgBoxに。

  const centerX = svgBox.left + svgBox.width / 2;
  // 横幅の真ん中取得

  const centerY = svgBox.top + svgBox.height / 2;
  // 縦幅の真ん中取得

  // 画面端までの最大距離（正規化用）
  const maxDistance = Math.hypot(
    svgBox.width / 2,
    svgBox.height / 2
  );

  targets.forEach((el) => {
    // elは今処理しているSVG要素。
    // 要素を1個受け取って、その要素に対して処理する。
    // 名前はelじゃなくてもいい。

    // 各要素のパスカット長さを取得
    if (typeof el.getTotalLength === "function") {
      const length = el.getTotalLength();
      // その要素の長さ。path, polygonなど

      el.style.setProperty("--length", length);
      // CSS変数にしている。
      // --length: 120; のようにしている。
      // 120は例。実際は上のgetTotalLengthの値に変化。
    } else {
      el.style.setProperty("--length", 1000);
      // 予備値
    }

    // 2. 各要素の中心座標を取得
    const rect = el.getBoundingClientRect();

    const elCenterX = rect.left + rect.width / 2;
    const elCenterY = rect.top + rect.height / 2;

    // 3. SVG中心からの距離（ユークリッド距離）を計算
    const distance = Math.hypot(
      elCenterX - centerX,
      elCenterY - centerY
    );

    // 4. 距離に応じてアニメーションの遅延時間(delay)を設定
    // 中央(距離0) -> delay 0秒
    // 外側ほど遅延が大きくなる（最大 1.8秒遅延）
    const maxDelay = 1;

    const delay = (distance / maxDistance) * maxDelay;

    el.style.setProperty(
      "--delay",
      `${delay.toFixed(90)}s`
    );
  });


  // セクションが画面に入ったとき、控えめに表示します。下からフワっと出す
  // const revealItems = document.querySelectorAll(".header-nav");

  // revealItems.forEach((item) => {
  //   item.classList.add("reveal");
  // });

  // const observer = new IntersectionObserver(
  //   (entries, currentObserver) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add("is-visible");
  //         currentObserver.unobserve(entry.target);
  //       }
  //     });
  //   },
  //   {
  //     threshold: 0.12
  //   }
  // );

  // revealItems.forEach((item) => {
  //   observer.observe(item);
  // });

  





  // FVを過ぎたらheaderがサイドへ移動するclassがつく。
  // スクロールしたら私が書きました。

  const logo = document.querySelector(".header-logo");
  const nav = document.querySelector(".header-nav");
  const fvHeight = window.innerHeight;
  // fvの高さ
// ナビを最初に表示する
  setTimeout(() => {
  nav.classList.add("is-visible");
}, 300);

  window.addEventListener("scroll", () => {
    if (window.scrollY > fvHeight - 100) {
      logo.classList.add("is-scrolled");
      nav.classList.add("nav-scrolled");
    } else {
      logo.classList.remove("is-scrolled");
      nav.classList.remove("nav-scrolled");
    }
  });
});

const commonItems = document.querySelectorAll(".common");

const commonObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        // 一度表示したら監視を終了
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2
  }
);

commonItems.forEach((item) => {
  commonObserver.observe(item);
});

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".header-nav");
const navLinks = document.querySelectorAll(".header-nav a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-open");
  nav.classList.toggle("is-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("is-open");
    nav.classList.remove("is-open");
  });
});