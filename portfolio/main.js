// =========================================================
//   Moena Miner Portfolio — main.js
//   （JavaScriptが動かなくても、内容はすべて読めます）
// =========================================================

// ▼ リンク先の設定：URLが決まったらここに入れるだけで、お問い合わせボタンに反映されます
const LINKS = {
  form: 'https://forms.gle/snENVeQnyHEtYXBm7', 
};
// ▲ ここまで

(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- メニュー開閉 ----
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('global-nav');
  if (btn && nav) {
    const backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    document.body.appendChild(backdrop);
    const setMenu = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('.menu-label').textContent = open ? 'CLOSE' : 'MENU';
      nav.classList.toggle('is-open', open);
      backdrop.classList.toggle('is-open', open);
      if (open) nav.querySelector('a')?.focus({ preventScroll: true });
    };
    btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
    backdrop.addEventListener('click', () => setMenu(false));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setMenu(false); btn.focus(); }
    });
    window.matchMedia('(min-width: 1100px)').addEventListener('change', () => setMenu(false));
  }

  // ---- 制作実績：カテゴリの件数・拡大アイコン・表示の時間差 ----
  document.querySelectorAll('.jump').forEach((a) => {
    const group = document.querySelector(a.getAttribute('href'));
    const count = a.querySelector('span');
    if (group && count) count.textContent = group.querySelectorAll('.work').length;
  });
  const zoomIcon = '<svg viewBox="0 0 24 24" class="icon" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15.5 15.5 20 20M8 10.5h5M10.5 8v5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
  document.querySelectorAll('.works').forEach((list) => {
    list.querySelectorAll('.work').forEach((work, i) => {
      work.style.setProperty('--d', `${(i % 2) * 60}ms`);
      const thumb = work.querySelector('.work-thumb');
      const title = work.querySelector('.work-title')?.textContent.trim();
      if (!thumb) return;
      thumb.insertAdjacentHTML('beforeend', `<span class="zoom" aria-hidden="true">${zoomIcon}</span>`);
      if (title) thumb.setAttribute('aria-label', `${title}の画像を拡大`);
    });
  });
  document.querySelectorAll('.event-thumb').forEach((thumb) => {
    const title = thumb.closest('.event')?.querySelector('h4')?.textContent.trim();
    if (title) thumb.setAttribute('aria-label', `${title}の告知画像を拡大`);
  });

  // ---- スクロールでふわっと表示 ----
  const items = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach((el) => io.observe(el));
    // 念のため：3秒たっても表示されていないものは表示する（読み込みの遅い環境向け）
    setTimeout(() => items.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
    }), 3000);
  }

  // ---- 作品の拡大表示（カードの内容をそのまま使って作ります） ----
  const dialog = document.querySelector('.work-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const inner = dialog.querySelector('.dialog-inner');
    let opener = null;

    const build = (a) => {
      const frag = document.createDocumentFragment();
      const img = document.createElement('img');
      img.src = a.getAttribute('href');
      img.alt = a.querySelector('img')?.alt || '';
      img.className = 'dialog-img';
      frag.append(img);

      const info = a.closest('.work')?.querySelector('.work-info');
      if (info) {
        const box = info.cloneNode(true);
        box.className = 'dialog-info';
        const h4 = box.querySelector('.work-title');
        if (h4) {
          const h2 = document.createElement('h2');
          h2.className = 'dialog-title';
          h2.textContent = h4.textContent;
          h4.replaceWith(h2);
        }
        frag.append(box);
      } else {
        img.classList.add('dialog-img-only');
      }
      return frag;
    };

    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-zoom]');
      if (!a) return;
      e.preventDefault();
      inner.replaceChildren(build(a));
      opener = a;
      dialog.showModal();
      document.body.classList.add('is-locked');
      inner.scrollTop = 0;
      dialog.querySelector('.dialog-close').focus();
    });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('is-locked');
      opener?.focus({ preventScroll: true });
    });
  }

  // ---- お問い合わせボタン（LINKS にURLが入っていればそのページへ） ----
  document.querySelectorAll('[data-link]').forEach((a) => {
    const url = LINKS[a.dataset.link];
    if (url) {
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
    } else {
      const status = a.parentElement.querySelector('.form-status');
      a.addEventListener('click', (e) => {
        e.preventDefault();
        if (status) status.textContent = 'お問い合わせフォームは準備中です。もうしばらくお待ちください。';
      });
    }
  });
})();
