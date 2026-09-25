(() => {
  const APPS = [
    {
      id: "yi-jing",
      name: "Kinh Dịch",
      description: "Gieo quẻ · Tra 64 quẻ",
      href: "https://yi-jing-khaki.vercel.app/",
      match: (location) => location.hostname.startsWith("yi-jing"),
      preview: `
        <span class="mas-preview mas-preview-yi">
          <i class="mas-yi-side"></i>
          <i class="mas-yi-orb">☯</i>
          <i class="mas-yi-title"></i>
          <i class="mas-yi-input mas-yi-input-a"></i>
          <i class="mas-yi-input mas-yi-input-b"></i>
          <i class="mas-yi-btn"></i>
        </span>
      `
    },
    {
      id: "buddha",
      name: "Phật Thích Ca 3D",
      description: "Tượng 3D · Zen halo",
      href: "https://bdx0.github.io/lab/buddha/",
      match: (location) => location.hostname === "bdx0.github.io" && location.pathname.startsWith("/lab/buddha"),
      preview: `
        <span class="mas-preview mas-preview-buddha">
          <i class="mas-buddha-halo"></i>
          <i class="mas-buddha-head"></i>
          <i class="mas-buddha-body"></i>
          <i class="mas-buddha-base"></i>
          <i class="mas-buddha-glow"></i>
        </span>
      `
    },
    {
      id: "ly-dragon",
      name: "Rồng thời Lý 3D",
      description: "Mô hình 3D tương tác",
      href: "https://bdx0.github.io/apps/ly-dragon",
      match: (location) => location.hostname === "bdx0.github.io" && location.pathname.startsWith("/apps/ly-dragon"),
      preview: `
        <span class="mas-preview mas-preview-dragon">
          <svg class="mas-dragon-art" viewBox="0 0 220 120" aria-hidden="true">
            <path d="M27 79 C47 38 87 92 111 54 C130 25 164 35 171 55 C177 73 156 83 142 72 C126 59 138 43 155 40 C178 36 193 54 186 75 C176 103 124 100 94 83 C68 68 56 64 44 73" />
            <path d="M163 40 L174 25 L176 43 M151 39 L155 23 L163 39" class="horn"/>
            <circle cx="169" cy="54" r="3.2" class="eye"/>
          </svg>
          <i class="mas-dragon-ring"></i>
          <i class="mas-dragon-glow"></i>
        </span>
      `
    }
  ];

  const HUB_URL = "https://bdx0.github.io/lab";

  function ensureStyles() {
    if (document.getElementById("mini-app-switcher-styles-v2")) return;
    const style = document.createElement("style");
    style.id = "mini-app-switcher-styles-v2";
    style.textContent = `
      .mas-root{position:relative;z-index:10000;font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      .mas-launcher{min-height:40px;display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid rgba(74,55,38,.18);border-radius:12px;padding:8px 12px;background:#fbf7ef;color:#392b20;box-shadow:0 8px 24px rgba(35,24,15,.10);font:700 12px/1 inherit;cursor:pointer;white-space:nowrap}
      .mas-launcher:hover{background:#fffdf8;border-color:rgba(147,104,53,.35)}
      .mas-launcher:focus-visible{outline:3px solid rgba(184,137,67,.32);outline-offset:2px}
      .mas-dots{display:grid;grid-template-columns:repeat(3,3px);gap:2px;width:13px}
      .mas-dots i{width:3px;height:3px;border-radius:50%;background:#a2733d}
      .mas-root.mas-compact .mas-launcher{width:40px;height:40px;padding:0;border-radius:12px}
      .mas-root.mas-compact .mas-label{display:none}
      .mas-popover{position:absolute;top:calc(100% + 10px);width:min(520px,calc(100vw - 24px));padding:14px;border:1px solid rgba(74,55,38,.14);border-radius:21px;background:rgba(253,249,241,.985);color:#30251d;box-shadow:0 28px 80px rgba(30,20,12,.22);backdrop-filter:blur(20px);opacity:0;visibility:hidden;transform:translateY(-6px) scale(.985);transform-origin:top right;transition:opacity .16s ease,transform .16s ease,visibility .16s ease}
      .mas-root:not(.mas-compact) .mas-popover{left:0;transform-origin:top left}
      .mas-root.mas-compact .mas-popover{right:0}
      .mas-root.mas-open .mas-popover{opacity:1;visibility:visible;transform:translateY(0) scale(1)}
      .mas-head{display:flex;align-items:end;justify-content:space-between;padding:2px 2px 12px}
      .mas-head strong{font:780 15px/1.2 inherit}.mas-head span{font-size:10px;color:#8c7a68}
      .mas-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
      .mas-app{position:relative;overflow:hidden;display:block;border:1px solid rgba(74,55,38,.11);border-radius:17px;background:#fffdf8;color:inherit;text-decoration:none;transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease}
      .mas-app:hover{transform:translateY(-2px);border-color:rgba(169,119,59,.42);box-shadow:0 14px 30px rgba(50,32,18,.09)}
      .mas-app.mas-active{border-color:#bd925b;box-shadow:inset 0 0 0 1px rgba(189,146,91,.18)}
      .mas-preview{position:relative;display:block;width:100%;aspect-ratio:16/9;overflow:hidden;border-bottom:1px solid rgba(74,55,38,.10)}
      .mas-app-copy{display:grid;gap:3px;padding:11px 12px 12px}
      .mas-app-copy strong{font:760 12px/1.25 inherit}.mas-app-copy small{font:500 10px/1.35 inherit;color:#8c7a68}
      .mas-current{position:absolute;top:8px;right:8px;z-index:5;padding:5px 7px;border-radius:999px;background:rgba(250,247,238,.92);box-shadow:0 4px 16px rgba(0,0,0,.12);font-size:8px;font-weight:850;color:#55704d;text-transform:uppercase;letter-spacing:.08em}
      .mas-footer{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:10px;padding:10px 3px 1px;border-top:1px solid rgba(74,55,38,.10)}
      .mas-footer a{color:#7d5a34;text-decoration:none;font-size:11px;font-weight:750}.mas-footer a:hover{text-decoration:underline}
      .mas-footer span{color:#a09181;font-size:9px}

      .mas-preview-yi{background:linear-gradient(135deg,#f7f0e4,#ecdfca)}
      .mas-yi-side{position:absolute;left:0;top:0;bottom:0;width:24%;background:rgba(250,247,239,.94);border-right:1px solid rgba(91,65,41,.12)}
      .mas-yi-side:before,.mas-yi-side:after{content:"";position:absolute;left:12%;right:12%;height:6%;border-radius:8px;background:#eadcc4}
      .mas-yi-side:before{top:28%}.mas-yi-side:after{top:40%}
      .mas-yi-orb{position:absolute;left:49%;top:14%;width:19%;aspect-ratio:1;border-radius:50%;display:grid;place-items:center;transform:translateX(-50%);color:#f2d59a;background:radial-gradient(circle at 35% 30%,#735064,#332338 64%,#211725);font:700 clamp(17px,3vw,28px)/1 Georgia,serif;box-shadow:0 6px 18px rgba(70,43,70,.18)}
      .mas-yi-title{position:absolute;left:34%;right:15%;top:42%;height:7%;border-radius:8px;background:#6b4a2c;opacity:.78}
      .mas-yi-input{position:absolute;left:34%;right:15%;height:9%;border-radius:7px;background:#fffaf2;border:1px solid rgba(92,66,41,.12)}
      .mas-yi-input-a{top:56%}.mas-yi-input-b{top:68%;height:12%}
      .mas-yi-btn{position:absolute;left:39%;right:20%;bottom:8%;height:8%;border-radius:7px;background:#745033}

      .mas-preview-buddha{background:radial-gradient(circle at 50% 45%,#493b27 0,#211c15 35%,#0f0e0b 78%)}
      .mas-buddha-glow{position:absolute;left:50%;top:49%;width:58%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(246,200,106,.22),transparent 64%)}
      .mas-buddha-halo{position:absolute;left:50%;top:29%;width:30%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);border:3px solid rgba(255,220,139,.78);box-shadow:0 0 18px rgba(255,190,78,.42),inset 0 0 18px rgba(255,190,78,.16)}
      .mas-buddha-head{position:absolute;left:50%;top:27%;width:10%;aspect-ratio:.82;border-radius:48% 48% 45% 45%;transform:translate(-50%,-50%);background:linear-gradient(145deg,#f1eee4,#bfb8a7)}
      .mas-buddha-body{position:absolute;left:50%;top:58%;width:34%;height:46%;border-radius:46% 46% 22% 22% / 38% 38% 18% 18%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#f0ece2,#aaa391);clip-path:polygon(50% 0,68% 12%,79% 35%,100% 76%,78% 92%,50% 78%,22% 92%,0 76%,21% 35%,32% 12%)}
      .mas-buddha-base{position:absolute;left:50%;bottom:7%;width:48%;height:13%;border-radius:50%;transform:translateX(-50%);background:linear-gradient(180deg,#746b5e,#2a2722);box-shadow:0 8px 20px rgba(0,0,0,.35)}

      .mas-preview-dragon{background:radial-gradient(circle at 62% 35%,#173b37 0,#0a1819 42%,#04090a 82%)}
      .mas-dragon-glow{position:absolute;inset:10%;background:radial-gradient(ellipse at center,rgba(99,219,199,.17),transparent 62%)}
      .mas-dragon-ring{position:absolute;left:50%;bottom:11%;width:72%;height:16%;border:1px solid rgba(125,230,211,.38);border-radius:50%;transform:translateX(-50%);box-shadow:0 0 18px rgba(86,206,187,.10)}
      .mas-dragon-art{position:absolute;inset:3% 4% 8%;width:92%;height:89%;filter:drop-shadow(0 0 7px rgba(103,221,199,.34))}
      .mas-dragon-art path{fill:none;stroke:#7fc5b6;stroke-width:8;stroke-linecap:round;stroke-linejoin:round}
      .mas-dragon-art path.horn{stroke:#e2c792;stroke-width:4}.mas-dragon-art .eye{fill:#ffd777;stroke:none}

      @media(max-width:520px){
        .mas-popover{width:min(340px,calc(100vw - 18px))}
        .mas-grid{grid-template-columns:1fr}
        .mas-app{display:grid;grid-template-columns:118px 1fr;min-height:76px}
        .mas-preview{aspect-ratio:auto;height:76px;border-bottom:0;border-right:1px solid rgba(74,55,38,.10)}
        .mas-app-copy{align-content:center}
      }
    `;
    document.head.appendChild(style);
  }

  function createSwitcher(host) {
    if (host.dataset.switcherReady === "2") return;
    host.dataset.switcherReady = "2";
    host.innerHTML = "";
    const compact = host.dataset.compact === "true";
    const root = document.createElement("div");
    root.className = "mas-root" + (compact ? " mas-compact" : "");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "mas-launcher";
    button.setAttribute("aria-haspopup", "menu");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Chuyển mini app");
    button.innerHTML = '<span class="mas-dots"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="mas-label">Mini Apps</span>';

    const popover = document.createElement("div");
    popover.className = "mas-popover";
    popover.setAttribute("role", "menu");

    const current = APPS.find(app => app.match(window.location));
    const cards = APPS.map(app => {
      const active = current?.id === app.id;
      return `
        <a class="mas-app${active ? " mas-active" : ""}" href="${app.href}" role="menuitem" aria-label="${app.name}">
          ${app.preview}
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

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
