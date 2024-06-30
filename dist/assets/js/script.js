/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../src/js/_common.js":
/*!****************************!*\
  !*** ../src/js/_common.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   common: () => (/* binding */ common)
/* harmony export */ });
function common() {
  // ----------------------
  // ページトップ表示切り替え
  // ----------------------
  var jsPageTopBtn = document.querySelector(".js-page-top");
  if (jsPageTopBtn) {
    function getScrolled() {
      return window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop;
    }
    window.onscroll = function () {
      getScrolled() > 1000 ? jsPageTopBtn.classList.add("is-active") : jsPageTopBtn.classList.remove("is-active");
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

/***/ }),

/***/ "../src/js/_drawer.js":
/*!****************************!*\
  !*** ../src/js/_drawer.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   drawer: () => (/* binding */ drawer)
/* harmony export */ });
function drawer() {
  // ----------------------
  //ハンバーガーメニュー
  // ----------------------
  var header = document.querySelector(".js-header");
  var hamburger = document.querySelector(".js-hamburger");
  var spHeaderMenu = document.querySelector(".js-drawer-menu");
  var drawerMenuItems = document.querySelectorAll(".js-drawer-menu__item");
  function toggleDrawer(isOpen) {
    var expanded = isOpen ? "false" : "true";
    var hidden = isOpen ? "true" : "false";
    hamburger.setAttribute("aria-expanded", expanded);
    spHeaderMenu.setAttribute("aria-hidden", hidden);
    header.classList.toggle("is_active", !isOpen);
  }
  hamburger.addEventListener("click", function () {
    var isOpen = this.getAttribute("aria-expanded") === "true";
    toggleDrawer(isOpen);
  });
  drawerMenuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      return toggleDrawer();
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      toggleDrawer();
    }
  });
}

/***/ }),

/***/ "../src/js/_modal.js":
/*!***************************!*\
  !*** ../src/js/_modal.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modal: () => (/* binding */ modal)
/* harmony export */ });
function modal() {
  // ----------------------
  // モーダル制御
  // ----------------------
  document.addEventListener("DOMContentLoaded", function () {
    // ボタンのdata-modal-openと一致するモーダルを開く
    var modalTriggers = document.querySelectorAll("[data-modal-open]");
    modalTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var modalId = trigger.getAttribute("data-modal-open");
        var modal = document.getElementById(modalId);
        if (modal) {
          modal.showModal();
        }
      });
    });
    // モーダル内の閉じるボタンをクリックしたらモーダルを閉じる
    var closeButtons = document.querySelectorAll("[data-modal-close]");
    closeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var modal = button.closest("dialog");
        if (modal) {
          modal.close();
        }
      });
    });
    // モーダル背景をクリックしたらモーダルを閉じる
    var modalDialog = document.querySelectorAll(".js-modalDialog");
    modalDialog.forEach(function (dialog) {
      dialog.addEventListener("click", function (event) {
        if (event.target.closest(".js-modalContainer") === null) {
          dialog.close();
        }
      });
    });
  });
}

/***/ }),

/***/ "../src/js/_scroll.js":
/*!****************************!*\
  !*** ../src/js/_scroll.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   smoothScroll: () => (/* binding */ smoothScroll)
/* harmony export */ });
function smoothScroll() {
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
  var drawer = document.getElementById("drawer");
  document.addEventListener("DOMContentLoaded", function () {
    initializeSmoothScroll();
    if (drawer) {
      initializePopoverMenu(drawer);
    }
  });
}

/***/ }),

/***/ "../src/js/_slider.js":
/*!****************************!*\
  !*** ../src/js/_slider.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   slider: () => (/* binding */ slider)
/* harmony export */ });
function slider() {
  // ----------------------
  // スライダー修正治療の流れ
  // ----------------------
  document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector(".js-flow-swiper")) {
      var swiper1 = new Swiper(".js-flow-swiper", {
        width: 300,
        spaceBetween: 40,
        // スライド間の余白（px）
        speed: 300,
        // スライドアニメーションのスピード（ミリ秒）
        watchSlidesProgress: true,
        // スライドの進行状況を監視する
        grabCursor: true,
        // PCでマウスカーソルを「掴む」マークにする
        mousewheel: {
          //横スクロール有効
          forceToAxis: true,
          sensitivity: 3
        },
        breakpoints: {
          // ブレークポイント
          768: {
            // 画面幅768px以上で適用
            width: 406,
            spaceBetween: 70 // スライド間の余白（px）
          }
        }
      });
    }
  });

  // ----------------------
  // スライダー ドラッグでスクロール
  // ----------------------
  document.addEventListener("DOMContentLoaded", function () {
    var cardsList = document.querySelectorAll(".js-cards");
    cardsList.forEach(function (cards) {
      var isDown = false;
      var startX;
      var scrollLeft;
      cards.addEventListener("mousedown", function (e) {
        isDown = true;
        cards.classList.add("active");
        startX = e.pageX - cards.offsetLeft;
        scrollLeft = cards.scrollLeft;
      });
      cards.addEventListener("mouseleave", function () {
        isDown = false;
        cards.classList.remove("active");
      });
      cards.addEventListener("mouseup", function () {
        isDown = false;
        cards.classList.remove("active");
      });
      cards.addEventListener("mousemove", function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - cards.offsetLeft;
        var walk = (x - startX) * 3; // スクロールの速度を調整
        cards.scrollLeft = scrollLeft - walk;
      });
    });
  });
}

/***/ }),

/***/ "../src/js/_tab.js":
/*!*************************!*\
  !*** ../src/js/_tab.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tab: () => (/* binding */ tab)
/* harmony export */ });
function tab() {
  // ----------------------
  // タブ制御
  // ----------------------
  document.addEventListener("DOMContentLoaded", function () {
    // 最初のタブターゲットにis-activeを付与しておく
    var firstTarget = document.querySelector(".js-works-tab-target");
    if (firstTarget) {
      firstTarget.classList.add("is-active");
    }
  });
  // タブをすべて取得
  var tabs = document.querySelectorAll(".js-works-tab");
  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      // すべてのタブターゲットを取得
      var targets = document.querySelectorAll(".js-works-tab-target");

      // すべてのタブからis-activeクラスを外す
      tabs.forEach(function (t) {
        return t.classList.remove("is-active");
      });

      // クリックされたタブにis-activeクラスを付与
      tab.classList.add("is-active");

      // すべてのタブターゲットからis-activeクラスを外す
      targets.forEach(function (target) {
        target.classList.remove("is-active");
      });

      // クリックされたタブの順番と同じタブターゲットにis-activeクラスを付与
      targets[index].classList.add("is-active");
    });
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ../src/js/script.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _drawer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_drawer.js */ "../src/js/_drawer.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_common.js */ "../src/js/_common.js");
/* harmony import */ var _scroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_scroll.js */ "../src/js/_scroll.js");
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_slider.js */ "../src/js/_slider.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_modal.js */ "../src/js/_modal.js");
/* harmony import */ var _tab_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_tab.js */ "../src/js/_tab.js");






(0,_drawer_js__WEBPACK_IMPORTED_MODULE_0__.drawer)();
(0,_common_js__WEBPACK_IMPORTED_MODULE_1__.common)();
(0,_scroll_js__WEBPACK_IMPORTED_MODULE_2__.smoothScroll)();
(0,_slider_js__WEBPACK_IMPORTED_MODULE_3__.slider)();
(0,_modal_js__WEBPACK_IMPORTED_MODULE_4__.modal)();
(0,_tab_js__WEBPACK_IMPORTED_MODULE_5__.tab)();

// ----------------------
// 以下はjQueryの記述
// ----------------------
// jQuery(function ($) {

// });
})();

/******/ })()
;
//# sourceMappingURL=script.js.map