const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});

// スクロールを検知してクラスをつける設定
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // 画面の下から10%入ったところで反応
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// ページが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {

    const targets = document.querySelectorAll('.intro-section, .category, .menu-content h2');
    
    targets.forEach(el => {
        el.classList.add('fade-in'); 
        observer.observe(el); 
    });
});