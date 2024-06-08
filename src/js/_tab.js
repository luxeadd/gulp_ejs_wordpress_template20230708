export function tab() {
  // ----------------------
  // タブ制御
  // ----------------------
  document.addEventListener("DOMContentLoaded", function () {
    // 最初のタブターゲットにis-activeを付与しておく
    const firstTarget = document.querySelector(".js-works-tab-target");
    if (firstTarget) {
      firstTarget.classList.add("is-active");
    }
  });
  // タブをすべて取得
  const tabs = document.querySelectorAll(".js-works-tab");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // すべてのタブターゲットを取得
      const targets = document.querySelectorAll(".js-works-tab-target");

      // すべてのタブからis-activeクラスを外す
      tabs.forEach((t) => t.classList.remove("is-active"));

      // クリックされたタブにis-activeクラスを付与
      tab.classList.add("is-active");

      // すべてのタブターゲットからis-activeクラスを外す
      targets.forEach((target) => {
        target.classList.remove("is-active");
      });

      // クリックされたタブの順番と同じタブターゲットにis-activeクラスを付与
      targets[index].classList.add("is-active");
    });
  });
}
