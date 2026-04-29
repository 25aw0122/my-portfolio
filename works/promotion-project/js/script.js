
const hmb = document.getElementById('hmb');
const nav = document.querySelector('.nav');
const closeBtn = document.getElementById('close');
const topBtn = document.querySelector('.top-btn');



//ハンバーガーメニュー
hmb.addEventListener('click', () => {
    nav.classList.toggle('active');

});

closeBtn.addEventListener('click', () => {
    nav.classList.remove('active');
});

document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

//よくある質問
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const all = button.closest('.faq-item');
        all.classList.toggle('active');
    });
});

//トップへ戻るボタン
topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
