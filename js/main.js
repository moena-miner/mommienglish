/* =========================================================
   MommiEnglish — main.js
========================================================= */

/* ▼ リンク先の設定：URLが決まったらここに入れるだけで全ページのボタンに反映されます */
var LINKS = {
  line: "",   // 公式LINEのURL（ママ向けレッスン・Smilingual共通）例: "https://lin.ee/xxxxxxx"
  form: ""    // GoogleフォームのURL（ME Lounge・教材・登壇/イベント・その他）例: "https://forms.gle/xxxxxxx"
};
/* ▲ ここまで */

(function(){
  document.documentElement.classList.add("js");

  // メニュー（スマホ・タブレット）
  var hamb = document.getElementById("hamb");
  var drawer = document.getElementById("drawer");
  if (hamb && drawer) {
    hamb.addEventListener("click", function(){
      var open = drawer.classList.toggle("open");
      hamb.setAttribute("aria-expanded", open ? "true" : "false");
    });
    drawer.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        drawer.classList.remove("open");
        hamb.setAttribute("aria-expanded", "false");
      });
    });
  }

  // LINE・フォームのボタン
  var toast = document.getElementById("toast"), timer;
  function notice(msg){
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(function(){ toast.classList.remove("show"); }, 2400);
  }
  document.querySelectorAll("[data-link]").forEach(function(a){
    var url = LINKS[a.getAttribute("data-link")];
    if (url) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.href = "#";
      a.addEventListener("click", function(e){
        e.preventDefault();
        notice("ただいま準備中です。もうしばらくお待ちください。");
      });
    }
  });

  // スクロールでふわっと表示
  var items = document.querySelectorAll(".sec > .wrap, .reveal");
  items.forEach(function(el){ el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function(el){ io.observe(el); });
  } else {
    items.forEach(function(el){ el.classList.add("in"); });
  }
})();
