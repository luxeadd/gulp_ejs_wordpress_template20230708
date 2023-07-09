"use strict";

var jsHamburger = document.getElementById("js-hamburger");
var body = document.body;
var spHeaderMenu = document.getElementById("js-drawer-menu");
var drawerBackground = document.getElementById("js-header__overlay");
var drawerMenuItems = document.querySelectorAll(".js-header-menu__item");
var html = document.querySelector("html");
//ドロワーメニュー展開時背景固定1
var lockTop;
function screenLock() {
  lockTop = document.documentElement.scrollTop || document.body.scrollTop;
  html.classList.add("is-screen-locked");
  return lockTop;
}
function screenUnLock() {
  html.classList.remove("is-screen-locked");
  window.scrollTo(0, lockTop);
}

//ハンバーガーメニュークリックアクション
jsHamburger.addEventListener("click", function () {
  body.classList.toggle("is-drawerActive");
  if (this.getAttribute("aria-expanded") == "false") {
    this.setAttribute("aria-expanded", "true");
    spHeaderMenu.setAttribute("aria-hidden", "false");
    screenLock();
  } else {
    this.setAttribute("aria-expanded", "false");
    spHeaderMenu.setAttribute("aria-hidden", "true");
    screenUnLock();
  }
});
//ドラワーメニュー展開時背景クリックアクション
drawerBackground.addEventListener("click", function () {
  body.classList.remove("is-drawerActive");
  jsHamburger.setAttribute("aria-expanded", "false");
  spHeaderMenu.setAttribute("aria-hidden", "true");
  screenUnLock();
});
//ドラワーメニュー展開時リストクリックアクション
for (var a = 0; a < drawerMenuItems.length - 1; a++) {
  drawerMenuItems[a].addEventListener("click", function () {
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
jQuery(function ($) {});