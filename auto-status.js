/**
 * auto-status.js
 * ------------------------------------------------------
 * "준비중"으로 표시된 강의/폴더 링크를 자동으로 검사해서,
 * 실제로 해당 파일이 서버에 올라와 있으면 "GO"로 바꿔주는 스크립트.
 *
 * book-card에 data-check 속성을 추가하면 적용됩니다. (선택 사용)
 *   <a class="book-card" data-check href="./1과/index.html">...</a>
 *
 * 사용법: index.html의 </body> 바로 위에 아래 한 줄을 넣습니다.
 *   <script src="/auto-status.js" defer></script>
 * ------------------------------------------------------
 */

(function () {
  var GO_LABEL = "GO";
  var PENDING_LABEL = "준비중";

  function markAsReady(pillEl) {
    pillEl.textContent = GO_LABEL;
    pillEl.classList.add("ready");
  }

  function checkAndUpdate(cardEl) {
    var pillEl = cardEl.querySelector(".status");
    if (!pillEl) return;
    if (pillEl.textContent.trim() !== PENDING_LABEL) return;

    var href = cardEl.getAttribute("href");
    if (!href) return;

    fetch(href, { method: "HEAD", cache: "no-store" })
      .then(function (res) {
        if (res.ok) markAsReady(pillEl);
      })
      .catch(function () {});
  }

  document.addEventListener("DOMContentLoaded", function () {
    var cards = document.querySelectorAll("a.book-card[data-check]");
    cards.forEach(checkAndUpdate);
  });
})();
