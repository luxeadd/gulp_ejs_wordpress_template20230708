const jsHamburger = document.getElementById("js-hamburger");
const body = document.body;
const spHeaderMenu = document.getElementById("js-drawer-menu");
const drawerBackground = document.getElementById("js-header__overlay");
const drawerMenuItems = document.querySelectorAll(".js-header-menu__item");
const html = document.querySelector("html");
//ドロワーメニュー展開時背景固定1
// let lockTop;
// function screenLock() {
//   lockTop = document.documentElement.scrollTop || document.body.scrollTop;
//   html.classList.add("is-screen-locked");
//   return lockTop;
// }
// function screenUnLock() {
//   html.classList.remove("is-screen-locked");
//   window.scrollTo(0, lockTop);
// }

//ハンバーガーメニュークリックアクション
jsHamburger.addEventListener("click", function () {
  body.classList.toggle("is-drawerActive");
  if (this.getAttribute("aria-expanded") == "false") {
    this.setAttribute("aria-expanded", "true");
    spHeaderMenu.setAttribute("aria-hidden", "false");
    // screenLock();
    body.classList.add("is-screen-locked");
  } else {
    this.setAttribute("aria-expanded", "false");
    spHeaderMenu.setAttribute("aria-hidden", "true");
    // screenUnLock();
    body.classList.remove("is-screen-locked");
  }
});
//ドラワーメニュー展開時背景クリックアクション
drawerBackground.addEventListener("click", () => {
  body.classList.remove("is-drawerActive");
  jsHamburger.setAttribute("aria-expanded", "false");
  spHeaderMenu.setAttribute("aria-hidden", "true");
  screenUnLock();
});
//ドラワーメニュー展開時リストクリックアクション
for (let a = 0; a < drawerMenuItems.length - 1; a++) {
  drawerMenuItems[a].addEventListener("click", () => {
    body.classList.remove("is-drawerActive");
    jsHamburger.setAttribute("aria-expanded", "false");
    spHeaderMenu.setAttribute("aria-hidden", "true");
  });
}
// escキーでドロワーメニュー閉じる
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    body.classList.remove("is-drawerActive");
    jsHamburger.setAttribute("aria-expanded", "false");
    spHeaderMenu.setAttribute("aria-hidden", "true");
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

jQuery(function ($) {

});
