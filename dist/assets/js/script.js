"use strict";

var header = document.querySelector(".js-header");
var hamburger = document.querySelector(".js-hamburger");
var body = document.body;
var spHeaderMenu = document.querySelector(".js-drawer-menu");
var drawerBackground = document.querySelector(".js-header__overlay");
var drawerMenuItems = document.querySelectorAll(".js-header-menu__item");
var html = document.querySelector("html");

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
for (var a = 0; a < drawerMenuItems.length - 1; a++) {
  drawerMenuItems[a].addEventListener("click", function () {
    jsHamburger.classList.remove("is_active");
    spHeaderMenu.classList.remove("is_active");
  });
}

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
var jsPageTopBtn = document.querySelector(".js-page-top");
function getScrolled() {
  return window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop;
}
window.onscroll = function () {
  getScrolled() > 1000 ? jsPageTopBtn.classList.add("is-active") : jsPageTopBtn.classList.remove("is-active");
};

// ----------------------
// スムーススクロール
// ----------------------
// ※固定ヘッダーの場合はheaderタグにdata-fixed-header付与すること
// ※スムーススクロールが不要なアンカーリンクにはdata-smooth-scroll="disabled"を付与すること
function initializeSmoothScroll() {
  var anchorLinks = document.querySelectorAll('a[href*="#"]');
  if (anchorLinks.length === 0) return;
  anchorLinks.forEach(function (anchorLink) {
    anchorLink.addEventListener("click", handleClick, false);
  });
}

// ヘッダーが固定配置されているかどうかを判定
function isHeaderFixed(header) {
  var position = window.getComputedStyle(header).position;
  var isFixed = position === "fixed" || position === "sticky";
  return isFixed;
}

// 固定配置のヘッダーのブロックサイズを取得
function getHeaderBlockSize() {
  var header = document.querySelector("[data-fixed-header]");
  var headerBlockSize = header && isHeaderFixed(header) ? window.getComputedStyle(header).blockSize : "0";
  return headerBlockSize;
}
console.log("ヘッダーの高さ" + getHeaderBlockSize());
function scrollToTarget(element) {
  var headerBlockSize = getHeaderBlockSize();
  // 固定配置のヘッダーのブロックサイズを`scrollMarginBlockStart`に設定
  element.style.scrollMarginBlockStart = headerBlockSize;
  // ユーザーが視差効果を減らす設定をしているかどうかを判定
  var isPrefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // 視差効果を減らす設定がされている場合は 'instant'、そうでない場合は 'smooth' にスクロール動作を設定
  var scrollBehavior = isPrefersReduced ? "instant" : "smooth";
  // 縦書きの場合は左スクロール、横書きの場合は上スクロールを実行
  element.scrollIntoView({
    behavior: scrollBehavior,
    inline: "end"
  });
}
function focusTarget(element) {
  // ターゲット要素にフォーカスを設定
  element.focus({
    preventScroll: true
  });
  // アクティブな要素がターゲット要素でない場合
  if (document.activeElement !== element) {
    // ターゲット要素のtabindexを一時的に-1に設定
    element.setAttribute("tabindex", "-1");
    // 再度フォーカスを設定
    element.focus({
      preventScroll: true
    });
  }
}
function handleClick(event) {
  // クリックされたボタンが左ボタンでない場合は処理を中断
  if (event.button !== 0) return;
  // クリックされたリンク要素を取得
  var currentLink = event.currentTarget;
  var hash = currentLink.hash;
  // スムーススクロールを無効にする条件をチェックし、スムーススクロールを無効にする場合は処理を中断
  // 中断する条件↓
  // クリックされたマウスのボタンが左ボタン(event.button === 0)でない場合
  // クリックされたa要素またはhash(リンクのハッシュ部分)が存在しない場合
  // クリックされたa要素のrole属性がtabである場合
  // クリックされたa要素のrole属性がbuttonである場合
  // クリックされたa要素にdata-smooth-scroll="disabled"が指定されている場合
  if (!currentLink || !hash || currentLink.getAttribute("role") === "tab" || currentLink.getAttribute("role") === "button" || currentLink.getAttribute("data-smooth-scroll") === "disabled") return;
  var target = document.getElementById(decodeURIComponent(hash.slice(1))) || hash === "#top" && document.body;
  if (target) {
    event.preventDefault();
    scrollToTarget(target);
    focusTarget(target);
    if (!(hash === "#top")) {
      history.pushState({}, "", hash);
    }
  }
}
function initializePopoverMenu(popoverElement) {
  var anchorLinks = popoverElement.querySelectorAll("a");
  if (anchorLinks.length > 0) {
    anchorLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        handleHashlinkClick(event, popoverElement);
      }, false);
      link.addEventListener("blur", function (event) {
        handleFocusableElementsBlur(event, popoverElement);
      }, false);
    });
  }
}
function handleHashlinkClick(event, popover) {
  popover.hidePopover();
}
function handleFocusableElementsBlur(event, popover) {
  var target = event.relatedTarget;
  if (!popover.contains(target)) {
    popover.hidePopover();
  }
}
var drawer = document.getElementById("drawer_menu");
document.addEventListener("DOMContentLoaded", function () {
  initializeSmoothScroll();
  if (drawer) {
    initializePopoverMenu(drawer);
  }
});

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
;

/* <div class="c-accordion">
  <button class="c-accordion__btn js-accordion__btn" aria-expanded="false" aria-label="開閉">上智での生涯学習講座の変遷</button>
  <div class="c-accordion__body" aria-hidden="true">
    <div>
      <ul class="c-list">
        <li class="is_triangle">
          学びを志す多様な立場に学びを志す多様な立場に学びを志す多様な立場に学びを志す学びを志す多様な立場に学びを志す多様な立場に学びを志す多様な立場に学びを志す
        </li>
        <li class="is_triangle">社会との連携</li>
        <li>テキストテキスト</li>
      </ul>
    </div>
  </div>
</div> */
// .c-accordion {
//   margin-top: rem(40);
//   border-bottom: 1px solid $yellow;
// }
// .c-accordion__btn {
//   display: block;
//   width: 100%;
//   margin: 0;
//   padding: 0;
//   border: 0;
//   background: transparent;
//   font-size: rem(22);
//   padding: rem(15) rem(20);
//   transition: background .3s ease;
//   text-align: left;
//   position: relative;

//   &[aria-expanded="true"] {

//   }
// }
// .c-accordion__body {
//   display: grid; 
//   grid-template-rows: 0fr;
//   transition: 250ms grid-template-rows ease, 250ms padding-block ease;

//   > div {
//     overflow: hidden;
//   }

//   &[aria-hidden="false"] {
//     grid-template-rows: 1fr;
//     padding-block: rem(30) rem(40);
//   }
// }

// ----------------------
// タブ制御
// ----------------------
document.addEventListener('DOMContentLoaded', function () {
  // 最初のタブターゲットにis-activeを付与しておく
  var firstTarget = document.querySelector('.js-works-tab-target');
  if (firstTarget) {
    firstTarget.classList.add('is-active');
  }
});
// タブをすべて取得
var tabs = document.querySelectorAll('.js-works-tab');
tabs.forEach(function (tab, index) {
  tab.addEventListener('click', function () {
    // すべてのタブターゲットを取得
    var targets = document.querySelectorAll('.js-works-tab-target');

    // すべてのタブからis-activeクラスを外す
    tabs.forEach(function (t) {
      return t.classList.remove('is-active');
    });

    // クリックされたタブにis-activeクラスを付与
    tab.classList.add('is-active');

    // すべてのタブターゲットからis-activeクラスを外す
    targets.forEach(function (target) {
      target.classList.remove('is-active');
    });

    // クリックされたタブの順番と同じタブターゲットにis-activeクラスを付与
    targets[index].classList.add('is-active');
  });
});

// ----------------------
// 以下はjQueryの記述
// ----------------------
// jQuery(function ($) {

// });