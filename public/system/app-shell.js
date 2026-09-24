(() => {
  const APPS = [{"id":"yi-jing","name":"Kinh Dịch","description":"Gieo quẻ · Tra 64 quẻ","href":"https://yi-jing-khaki.vercel.app/","hostPrefix":"yi-jing","preview":"yi"},{"id":"buddha","name":"Phật Thích Ca 3D","description":"Tượng 3D · Zen halo","href":"https://bdx0.github.io/lab/buddha/","host":"bdx0.github.io","pathPrefix":"/lab/buddha","preview":"buddha"},{"id":"dragon","name":"Rồng thời Lý 3D","description":"Mô hình 3D tương tác","href":"https://bdx0.github.io/lab/ly-dragon/","host":"bdx0.github.io","pathPrefix":"/lab/ly-dragon","preview":"dragon"}];
  const loc = window.location;
  const current = APPS.find((app) => {
    if (app.hostPrefix && loc.hostname.startsWith(app.hostPrefix)) return true;
    return app.host === loc.hostname && loc.pathname.startsWith(app.pathPrefix || "/");
  });
  if (!current || document.getElementById("bdx-system-shell")) return;

  document.documentElement.style.setProperty("--bdx-system-shell-height", "50px");
  document.body.classList.add("bdx-system-shell-active", "bdx-app-" + current.id);

  const style = document.createElement("style");
  style.id = "bdx-system-shell-style";
  style.textContent = "\nbody.bdx-system-shell-active{padding-top:50px!important}\nbody.bdx-app-yi-jing .app-shell{min-height:calc(100vh - 50px)!important}\nbody.bdx-app-yi-jing .sidebar{top:50px!important;height:calc(100vh - 50px)!important}\nbody.bdx-app-yi-jing .mobile-header{top:50px!important}\nbody.bdx-app-buddha #stage{inset:50px 0 0 0!important}\nbody.bdx-app-buddha .hud{top:64px!important}\nbody.bdx-app-buddha #loading,body.bdx-app-buddha #errorBox{top:50px!important}\nbody.bdx-app-dragon #app{inset:50px 0 0 0!important}\nbody.bdx-app-dragon .panel{top:68px!important}\nbody.bdx-app-dragon .loader{top:50px!important}\n#bdx-system-shell{position:fixed;left:0;right:0;top:0;height:50px;z-index:2147483000;background:rgba(250,250,248,.97);color:#171717;border-bottom:1px solid rgba(0,0,0,.12);box-shadow:0 1px 10px rgba(0,0,0,.06);backdrop-filter:blur(16px);font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif}\n#bdx-system-shell *{box-sizing:border-box}\n#bdx-system-shell a,#bdx-system-shell button{all:unset;box-sizing:border-box;font:inherit;color:inherit;cursor:pointer}\n.bdx-system-inner{height:100%;display:flex;align-items:center;gap:8px;padding:0 12px}\n.bdx-system-brand{font-weight:850;font-size:12px;letter-spacing:.08em}\n.bdx-system-crumb{display:flex;align-items:center;gap:8px;min-width:0;font-size:12px}\n.bdx-system-sep{color:#aaa}.bdx-system-appname{font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bdx-system-spacer{flex:1}\n.bdx-system-nav{display:flex;align-items:center;gap:4px}\n.bdx-system-nav>a,.bdx-system-gridbtn{height:32px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;padding:0 10px!important;border-radius:9px!important;font-size:11px!important;font-weight:700!important}\n.bdx-system-nav>a:hover,.bdx-system-gridbtn:hover{background:#ececea!important}\n.bdx-system-gridbtn{width:34px!important;padding:0!important;border:1px solid rgba(0,0,0,.10)!important}\n.bdx-nine{display:grid;grid-template-columns:repeat(3,3px);gap:2px}.bdx-nine i{width:3px;height:3px;border-radius:50%;background:#292929}\n.bdx-system-popover{position:absolute;right:12px;top:58px;width:min(430px,calc(100vw - 24px));padding:12px;border:1px solid rgba(0,0,0,.12);border-radius:16px;background:#fff;box-shadow:0 24px 70px rgba(0,0,0,.20);opacity:0;visibility:hidden;transform:translateY(-5px) scale(.985);transform-origin:top right;transition:opacity .15s ease,visibility .15s ease,transform .15s ease}\n#bdx-system-shell.bdx-open .bdx-system-popover{opacity:1;visibility:visible;transform:none}\n.bdx-pop-head{display:flex;align-items:center;justify-content:space-between;padding:2px 2px 10px}.bdx-pop-head strong{font-size:13px}.bdx-pop-head a{font-size:10px!important;color:#666!important}\n.bdx-app-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}\n.bdx-app-card{position:relative;display:block!important;overflow:hidden;border:1px solid rgba(0,0,0,.10)!important;border-radius:13px!important;background:#fafafa!important}\n.bdx-app-card:hover{border-color:rgba(0,0,0,.28)!important}.bdx-app-card.bdx-current{box-shadow:inset 0 0 0 1px #6d7b67}\n.bdx-preview{display:block;height:86px;position:relative;overflow:hidden;border-bottom:1px solid rgba(0,0,0,.08)}\n.bdx-preview.yi{background:linear-gradient(135deg,#f7f0e4,#ecdfca)}.bdx-preview.yi:before{content:\"☯\";position:absolute;left:52%;top:14px;transform:translateX(-50%);width:42px;height:42px;display:grid;place-items:center;border-radius:50%;background:#352116;color:#f2d59a;font:22px Georgia}.bdx-preview.yi:after{content:\"\";position:absolute;left:34%;right:14%;bottom:15px;height:10px;border-radius:8px;background:#745033}\n.bdx-preview.buddha{background:radial-gradient(circle at 50% 42%,#4b3c29 0,#201c15 38%,#0e0d0b 82%)}.bdx-preview.buddha:before{content:\"\";position:absolute;left:50%;top:27%;width:54px;height:54px;transform:translate(-50%,-50%);border:2px solid #efca7a;border-radius:50%;box-shadow:0 0 18px rgba(255,190,78,.35)}.bdx-preview.buddha:after{content:\"\";position:absolute;left:50%;bottom:-7px;width:64px;height:76px;transform:translateX(-50%);border-radius:48% 48% 20% 20%;background:linear-gradient(145deg,#eee9df,#9e9787);clip-path:polygon(50% 0,68% 12%,80% 38%,100% 78%,76% 92%,50% 79%,24% 92%,0 78%,20% 38%,32% 12%)}\n.bdx-preview.dragon{background:radial-gradient(circle at 62% 35%,#173b37 0,#091718 44%,#04090a 82%)}.bdx-preview.dragon:after{content:\"龍\";position:absolute;inset:0;display:grid;place-items:center;color:#83c9ba;font:44px Georgia;text-shadow:0 0 14px rgba(103,221,199,.35);transform:rotate(-8deg)}\n.bdx-card-copy{display:grid;gap:2px;padding:9px 10px!important}.bdx-card-copy strong{font-size:11px}.bdx-card-copy small{font-size:9px;color:#777}\n.bdx-current-tag{position:absolute;right:6px;top:6px;padding:3px 5px;border-radius:99px;background:rgba(255,255,255,.9);font-size:7px;font-weight:800;color:#52624d;text-transform:uppercase;letter-spacing:.06em}\n@media(max-width:640px){.bdx-system-nav>a{display:none!important}.bdx-system-crumb .bdx-apps-link,.bdx-system-crumb .bdx-sep-first{display:none!important}.bdx-app-grid{grid-template-columns:1fr}.bdx-preview{height:68px}.bdx-system-popover{width:min(320px,calc(100vw - 16px));right:8px}}\n";
  document.head.appendChild(style);

  const shell = document.createElement("div");
  shell.id = "bdx-system-shell";

  const inner = document.createElement("div");
  inner.className = "bdx-system-inner";

  const brand = document.createElement("a");
  brand.className = "bdx-system-brand";
  brand.href = "https://bdx0.github.io/";
  brand.textContent = "BDX0";

  const crumb = document.createElement("div");
  crumb.className = "bdx-system-crumb";
  crumb.innerHTML = '<span class="bdx-system-sep bdx-sep-first">/</span><a class="bdx-apps-link" href="https://bdx0.github.io/apps">Apps</a><span class="bdx-system-sep">/</span><span class="bdx-system-appname"></span>';
  crumb.querySelector(".bdx-system-appname").textContent = current.name;

  const spacer = document.createElement("span");
  spacer.className = "bdx-system-spacer";

  const nav = document.createElement("nav");
  nav.className = "bdx-system-nav";
  nav.setAttribute("aria-label", "BDX0 system");
  nav.innerHTML = '<a href="https://bdx0.github.io/apps">All Apps</a><a href="https://bdx0.github.io/lab">Lab</a><a href="https://bdx0.github.io/">Home</a>';

  const gridButton = document.createElement("button");
  gridButton.className = "bdx-system-gridbtn";
  gridButton.type = "button";
  gridButton.setAttribute("aria-label", "Switch app");
  gridButton.setAttribute("aria-expanded", "false");
  gridButton.innerHTML = '<span class="bdx-nine"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';
  nav.appendChild(gridButton);

  inner.appendChild(brand);
  inner.appendChild(crumb);
  inner.appendChild(spacer);
  inner.appendChild(nav);

  const popover = document.createElement("div");
  popover.className = "bdx-system-popover";
  popover.setAttribute("role", "menu");

  const head = document.createElement("div");
  head.className = "bdx-pop-head";
  head.innerHTML = '<strong>Switch app</strong><a href="https://bdx0.github.io/apps">App Hub →</a>';

  const grid = document.createElement("div");
  grid.className = "bdx-app-grid";
  APPS.forEach((app) => {
    const card = document.createElement("a");
    card.className = "bdx-app-card" + (app.id === current.id ? " bdx-current" : "");
    card.href = app.href;
    card.setAttribute("role", "menuitem");

    const preview = document.createElement("span");
    preview.className = "bdx-preview " + app.preview;

    const copy = document.createElement("span");
    copy.className = "bdx-card-copy";
    const title = document.createElement("strong");
    title.textContent = app.name;
    const desc = document.createElement("small");
    desc.textContent = app.description;
    copy.appendChild(title);
    copy.appendChild(desc);

    card.appendChild(preview);
    card.appendChild(copy);

    if (app.id === current.id) {
      const tag = document.createElement("span");
      tag.className = "bdx-current-tag";
      tag.textContent = "Current";
      card.appendChild(tag);
    }
    grid.appendChild(card);
  });

  popover.appendChild(head);
  popover.appendChild(grid);
  shell.appendChild(inner);
  shell.appendChild(popover);
  document.body.prepend(shell);

  gridButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = shell.classList.toggle("bdx-open");
    gridButton.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (event) => {
    if (!shell.contains(event.target)) {
      shell.classList.remove("bdx-open");
      gridButton.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      shell.classList.remove("bdx-open");
      gridButton.setAttribute("aria-expanded", "false");
    }
  });
})();