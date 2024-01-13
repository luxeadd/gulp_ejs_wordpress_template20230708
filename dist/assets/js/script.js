"use strict";

var jsHamburger = document.getElementById("js-hamburger");
var body = document.body;
var spHeaderMenu = document.getElementById("js-drawer-menu");
var drawerBackground = document.getElementById("js-header__overlay");
var drawerMenuItems = document.querySelectorAll(".js-header-menu__item");
var html = document.querySelector("html");
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
  if (!this.classList.contains("is_active")) {
    this.classList.add("is_active");
    spHeaderMenu.classList.add("is_active");
  } else {
    this.classList.remove("is_active");
    spHeaderMenu.classList.remove("is_active");
  }
});

//ドラワーメニュー展開時背景クリックアクション
// drawerBackground.addEventListener("click", () => {
//   jsHamburger.classList.remove("is_active");
//   spHeaderMenu.setAttribute("aria-hidden", "true");
//   screenUnLock();
// });

//ドラワーメニュー展開時リストクリックアクション
for (var a = 0; a < drawerMenuItems.length - 1; a++) {
  drawerMenuItems[a].addEventListener("click", function () {
    jsHamburger.classList.remove("is_active");
    spHeaderMenu.classList.remove("is_active");
  });
}
;

// escキーでドロワーメニュー閉じる
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
var jsPageTopBtn = document.querySelector('.js-page-top');
function getScrolled() {
  return window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop;
}
window.onscroll = function () {
  getScrolled() > 1000 ? jsPageTopBtn.classList.add('is-active') : jsPageTopBtn.classList.remove('is-active');
};
jQuery(function ($) {});