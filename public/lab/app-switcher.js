(() => {
  const APPS = [
    {
      id: "yi-jing",
      name: "Kinh Dịch",
      description: "Gieo quẻ · 64 quẻ",
      icon: "☯",
      href: "https://yi-jing-khaki.vercel.app/",
      match: (location) => location.hostname.startsWith("yi-jing")
    },
    {
      id: "buddha",
      name: "Phật Thích Ca 3D",
      description: "Tượng 3D · Zen halo",
      icon: "☸",
      href: "https://bdx0.github.io/lab/buddha/",
      match: (location) => location.hostname === "bdx0.github.io" && location.pathname.startsWith("/lab/buddha")
    },
    {
      id: "ly-dragon",
      name: "Rồng thời Lý 3D",
      description: "Mô hình 3D tương tác",
      icon: "龍",
      href: "https://bdx0.github.io/apps/ly-dragon",
      match: (location) => location.hostname === "bdx0.github.io" && location.pathname.startsWith("/apps/ly-dragon")
    }
  ];

  const HUB_URL = "https://bdx0.github.io/lab/";

  function ensureStyles() {
    if (document.getElementById("mini-app-switcher-styles")) return;
    const style = document.createElement("style");
    style.id = "mini-app-switcher-styles";
    style.textContent = `
      .mas-root{position:relative;z-index:10000;font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      .mas-launcher{
        min-height:38px;display:inline-flex;align-items:center;justify-content:center;gap:8px;
        border:1px solid rgba(74,55,38,.18);border-radius:12px;padding:8px 11px;
        background:#fbf7ef;color:#392b20;box-shadow:0 8px 24px rgba(35,24,15,.10);
        font:700 12px/1 inherit;cursor:pointer;white-space:nowrap
      }
      .mas-launcher:hover{background:#fffdf8;border-color:rgba(147,104,53,.35)}
      .mas-launcher:focus-visible{outline:3px solid rgba(184,137,67,.32);outline-offset:2px}
      .mas-dots{font-size:17px;line-height:1;color:#a2733d;letter-spacing:-2px}
      .mas-root.mas-compact .mas-launcher{width:38px;height:38px;padding:0;border-radius:12px}
      .mas-root.mas-compact .mas-label{display:none}
      .mas-popover{
        position:absolute;top:calc(100% + 9px);width:min(330px,calc(100vw - 24px));
        padding:12px;border:1px solid rgba(74,55,38,.16);border-radius:18px;
        background:rgba(253,249,241,.98);color:#30251d;
        box-shadow:0 24px 65px rgba(30,20,12,.20);backdrop-filter:blur(18px);
        opacity:0;visibility:hidden;transform:translateY(-5px) scale(.985);
        transform-origin:top right;transition:opacity .16s ease,transform .16s ease,visibility .16s ease
      }
      .mas-root:not(.mas-compact) .mas-popover{left:0;transform-origin:top left}
      .mas-root.mas-compact .mas-popover{right:0}
      .mas-root.mas-open .mas-popover{opacity:1;visibility:visible;transform:translateY(0) scale(1)}
      .mas-head{display:flex;align-items:center;justify-content:space-between;padding:3px 4px 10px}
      .mas-head strong{font:750 13px/1.2 inherit}.mas-head span{font-size:10px;color:#8c7a68}
      .mas-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
      .mas-app{
        min-height:94px;display:flex;flex-direction:column;justify-content:space-between;gap:9px;
        padding:12px;border:1px solid rgba(74,55,38,.11);border-radius:15px;
        background:#fffdf8;color:inherit;text-decoration:none;transition:transform .15s ease,border-color .15s ease,background .15s ease
      }
      .mas-app:hover{transform:translateY(-1px);border-color:rgba(169,119,59,.35);background:#fffaf0}
      .mas-app.mas-active{border-color:#bd925b;background:#f5ead7;box-shadow:inset 0 0 0 1px rgba(189,146,91,.20)}
      .mas-app-icon{font-family:Georgia,"Times New Roman",serif;font-size:25px;color:#75502d}
      .mas-app-copy{display:grid;gap:3px}
      .mas-app-copy strong{font:750 12px/1.25 inherit}.mas-app-copy small{font:500 10px/1.35 inherit;color:#8c7a68}
      .mas-current{font-size:9px;font-weight:800;color:#6b845f;text-transform:uppercase;letter-spacing:.08em}
      .mas-footer{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:9px;padding:9px 4px 1px;border-top:1px solid rgba(74,55,38,.10)}
      .mas-footer a{color:#7d5a34;text-decoration:none;font-size:11px;font-weight:750}.mas-footer a:hover{text-decoration:underline}
      .mas-footer span{color:#a09181;font-size:9px}
      @media(max-width:460px){
        .mas-popover{width:min(310px,calc(100vw - 18px))}
        .mas-grid{grid-template-columns:1fr}
        .mas-app{min-height:72px;display:grid;grid-template-columns:38px 1fr;align-items:center}
        .mas-app-icon{grid-row:1 / span 2}.mas-current{grid-column:2}
      }
    `;
    document.head.appendChild(style);
  }

  function createSwitcher(host) {
    if (host.dataset.switcherReady === "1") return;
    host.dataset.switcherReady = "1";
    const compact = host.dataset.compact === "true";
    const root = document.createElement("div");
    root.className = "mas-root" + (compact ? " mas-compact" : "");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "mas-launcher";
    button.setAttribute("aria-haspopup", "menu");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Chuyển mini app");
    button.innerHTML = '<span class="mas-dots">⠿</span><span class="mas-label">Mini Apps</span>';

    const popover = document.createElement("div");
    popover.className = "mas-popover";
    popover.setAttribute("role", "menu");

    const current = APPS.find(app => app.match(window.location));
    const cards = APPS.map(app => {
      const active = current?.id === app.id;
      return `
        <a class="mas-app${active ? " mas-active" : ""}" href="${app.href}" role="menuitem">
          <span class="mas-app-icon">${app.icon}</span>
          <span class="mas-app-copy">
            <strong>${app.name}</strong>
            <small>${app.description}</small>
          </span>
          ${active ? '<span class="mas-current">Đang mở</span>' : ""}
        </a>
      `;
    }).join("");

    popover.innerHTML = `
      <div class="mas-head"><strong>Mini Apps</strong><span>${APPS.length} ứng dụng</span></div>
      <div class="mas-grid">${cards}</div>
      <div class="mas-footer"><a href="${HUB_URL}">Mở App Hub →</a><span>bdx0 lab</span></div>
    `;

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = root.classList.toggle("mas-open");
      button.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", (event) => {
      if (!root.contains(event.target)) {
        root.classList.remove("mas-open");
        button.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        root.classList.remove("mas-open");
        button.setAttribute("aria-expanded", "false");
        button.focus();
      }
    });

    root.append(button, popover);
    host.appendChild(root);
  }

  function boot() {
    ensureStyles();
    document.querySelectorAll("[data-mini-app-switcher]").forEach(createSwitcher);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
