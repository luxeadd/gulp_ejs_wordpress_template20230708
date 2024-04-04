const header = document.querySelector(".js-header");
const hamburger = document.querySelector(".js-hamburger");
const body = document.body;
const spHeaderMenu = document.querySelector(".js-drawer-menu");
const drawerBackground = document.querySelector(".js-header__overlay");
const drawerMenuItems = document.querySelectorAll(".js-header-menu__item");
const html = document.querySelector("html");

// ----------------------
//ハンバーガーメニュークリックアクション
// ----------------------
hamburger.addEventListener("click", function () {
  var expanded = this.getAttribute("aria-expanded") === "true" || false;
  this.setAttribute("aria-expanded", !expanded);
  if (spHeaderMenu) {
    spHeaderMenu.setAttribute("aria-hidden", expanded);
    if (!expanded) {
      header.classList.add("is_active");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      header.classList.remove("is_active");
    }
  }
});

//ドラワーメニュー展開時リストクリックアクション
for (let a = 0; a < drawerMenuItems.length - 1; a++) {
  drawerMenuItems[a].addEventListener("click", () => {
    jsHamburger.classList.remove("is_active");
    spHeaderMenu.classList.remove("is_active");
  });
};

// ----------------------
// escキーでドロワーメニュー閉じる
// ----------------------
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    jsHamburger.classList.remove("is_active");
    spHeaderMenu.classList.remove("is_active");
    screenUnLock();
  }
});

// ----------------------
// ページトップ表示切り替え
// ----------------------
let jsPageTopBtn = document.querySelector('.js-page-top');
function getScrolled() {
  return ( window.pageYOffset !== undefined ) ? window.pageYOffset: document.documentElement.scrollTop;
}
window.onscroll = function() {
  ( getScrolled() > 1000 ) ? jsPageTopBtn.classList.add( 'is-active' ): jsPageTopBtn.classList.remove( 'is-active' );
};         

// jQuery(function ($) {

// });
