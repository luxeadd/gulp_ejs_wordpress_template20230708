export function common() {
  // ----------------------
  // ページトップ表示切り替え
  // ----------------------
  let jsPageTopBtn = document.querySelector(".js-page-top");
  if (jsPageTopBtn) {
    function getScrolled() {
      return window.pageYOffset !== undefined
        ? window.pageYOffset
        : document.documentElement.scrollTop;
    }
    window.onscroll = function () {
      getScrolled() > 1000
        ? jsPageTopBtn.classList.add("is-active")
        : jsPageTopBtn.classList.remove("is-active");
    };
  }

  // ----------------------
  // アコーディオン
  // ----------------------
  if (document.querySelector(".js-accordion__btn")) {
    document.querySelectorAll(".js-accordion__btn").forEach(function (button) {
      button.addEventListener("click", function () {
        var expanded = this.getAttribute("aria-expanded") === "true" || false;
        this.setAttribute("aria-expanded", !expanded);
        var body = this.nextElementSibling;
        if (body) {
          body.setAttribute("aria-hidden", expanded);
        }
      });
    });
  }
}
