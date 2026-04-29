document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion");
    const detailView = document.querySelector(".detail-view");
    const detailHeader = detailView.querySelector(".detail-header h3");
    const detailBody = detailView.querySelector(".detail-body p");
    const detailClose = detailView.querySelector(".detail-close");

    function showDetail(title, content, image, accordion) {
        detailHeader.textContent = title;
        detailBody.innerHTML = content;
        detailView.style.backgroundImage = `url(../img/${image})`;
        // アコーディオンの全要素を即座に非表示にする
        const allAccordions = document.querySelectorAll(".accordion");
        allAccordions.forEach(acc => {
            acc.style.display = "none";
        });
        detailView.style.display = "block";
        // 0.5秒のトランジションを設定
        detailView.classList.add("showing");
        setTimeout(() => {
            detailView.classList.add("show");
        }, 10);
    }

    function hideDetail() {
        // show クラスを削除（opacity: 0へ推移）→ 0.5秒かけてフェードアウト
        detailView.classList.remove("show");
        // アコーディオンを即座に表示に戻す
        const allAccordions = document.querySelectorAll(".accordion");
        allAccordions.forEach(acc => {
            acc.style.display = "";
        });
        setTimeout(() => {
            detailView.style.display = "none";
        }, 500);
    }

    accordions.forEach((accordion) => {
        const toggle = accordion.querySelector(".accordion-toggle");
        const content = accordion.querySelector(".accordion-content");
        const image = accordion.getAttribute('data-image');

        if (!toggle || !content || !image) return;

        toggle.addEventListener("click", function () {
            const title = toggle.querySelector(".title")?.textContent || "説明";
            const contentHtml = content.innerHTML;
            showDetail(title, contentHtml, image, accordion);
        });
    });

    detailClose.addEventListener("click", hideDetail);
});