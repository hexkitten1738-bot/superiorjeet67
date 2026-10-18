/* =========================================================
   main.js — shared header/footer, nav, small interactions
   Every page sets <body data-root="./"> (or "../" inside /ops)
   so links work on GitHub Pages project URLs.
   ========================================================= */

(function () {
  const root = document.body.dataset.root || "./";
  const page = document.body.dataset.page || "";

  /* ---- Favicon (inline SVG crown, no extra file / no 404) ---- */
  const fav = document.createElement("link");
  fav.rel = "icon";
  fav.href = "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
    '<rect width="32" height="32" rx="6" fill="#0d0e10"/>' +
    '<path d="M6 22l2-10 4 5 4-7 4 7 4-5 2 10z" fill="#7fbf8a"/>' +
    '<rect x="6" y="23" width="20" height="3" rx="1" fill="#a08ad8"/></svg>');
  document.head.appendChild(fav);

  /* ---- CONFIG: edit these placeholders ---- */
  window.SJ_CONFIG = {
    github: "https://github.com/YOUR-USERNAME",
    discordInvite: "https://discord.com/channels/1467158312419201034/1561474212512665640",
    discordHandle: "@Superiorjeet67",
    contactEmail: "research [at] example [dot] invalid"
  };

  const links = [
    ["home", "index.html", "~/home"],
    ["about", "about.html", "about"],
    ["experience", "experience.html", "experience"],
    ["research", "research.html", "research"],
    ["archives", "archives.html", "archives"],
    ["ops", "ops/index.html", "ops"],
    ["leaderboard", "leaderboard.html", "proof"],
    ["achievements", "achievements.html", "achievements"],
    ["contact", "contact.html", "contact"]
  ];

  /* ---- Header ---- */
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="wrap">
      <a class="brand" href="${root}index.html" aria-label="SuperiorJeet67 home">
        <span class="prompt">jeet@maharaja:~$</span> <span class="cursor" aria-hidden="true"></span>
      </a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">menu</button>
      <nav class="nav" id="site-nav" aria-label="Main">
        ${links.map(([id, href, label]) =>
          `<a href="${root}${href}"${id === page ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav>
    </div>`;
  document.body.prepend(header);

  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "close" : "menu";
  });

  /* ---- Footer with fictional-character notice ---- */
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="wrap">
      <div>
        <div class="mono">© ${new Date().getFullYear()} SuperiorJeet67 · MalwareMaharaja</div>
        <div class="fiction-note">Fictional satirical character. Not a real person, credential, or affiliation.
          <a href="${root}disclaimer.html">Read the disclosure</a>.</div>
      </div>
      <div class="mono">
        <a href="${window.SJ_CONFIG.github}" rel="noopener">github</a> ·
        <a href="${root}contact.html">discord</a> ·
        <a href="${root}leaderboard.html">847–0</a>
      </div>
    </div>`;
  document.body.append(footer);

  /* ---- Fill config placeholders anywhere on the page ---- */
  document.querySelectorAll("[data-config]").forEach(el => {
    const key = el.dataset.config;
    const val = window.SJ_CONFIG[key];
    if (!val) return;
    if (el.tagName === "A") el.href = val;
    if (!el.dataset.keepText) el.textContent = val;
  });

  /* ---- Fade-in on scroll ---- */
  const faders = document.querySelectorAll(".fade");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    faders.forEach(f => io.observe(f));
  } else {
    faders.forEach(f => f.classList.add("in"));
  }

  /* ---- Typing effect: <span data-type="text"> ---- */
  document.querySelectorAll("[data-type]").forEach(el => {
    const text = el.dataset.type;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = text; return; }
    let i = 0;
    el.textContent = "";
    const tick = () => { el.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(tick, 38); };
    setTimeout(tick, 500);
  });
})();

/* ---- Shared helpers ---- */
window.SJ = {
  async loadJSON(path) {
    const root = document.body.dataset.root || "./";
    const res = await fetch(root + path, { cache: "no-store" });
    if (!res.ok) throw new Error("Could not load " + path);
    return res.json();
  },
  esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  },
  loadError(el) {
    el.innerHTML = `<p class="notice-inline">Data files didn't load. If you opened this file straight from your computer,
      the browser blocks it — view the site on GitHub Pages or run a local server (see README).</p>`;
  },
  /* Modal */
  openModal(html) {
    let bd = document.getElementById("sj-modal");
    if (!bd) {
      bd = document.createElement("div");
      bd.id = "sj-modal";
      bd.className = "modal-backdrop";
      bd.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="sj-modal-title">
        <button class="modal-close" aria-label="Close">×</button><div class="modal-content"></div></div>`;
      document.body.append(bd);
      bd.addEventListener("click", e => { if (e.target === bd || e.target.closest(".modal-close")) SJ.closeModal(); });
      document.addEventListener("keydown", e => { if (e.key === "Escape") SJ.closeModal(); });
    }
    SJ._lastFocus = document.activeElement;
    bd.querySelector(".modal-content").innerHTML = html;
    bd.classList.add("open");
    document.body.style.overflow = "hidden";
    bd.querySelector(".modal-close").focus();
  },
  closeModal() {
    const bd = document.getElementById("sj-modal");
    if (!bd || !bd.classList.contains("open")) return;
    bd.classList.remove("open");
    document.body.style.overflow = "";
    if (SJ._lastFocus) SJ._lastFocus.focus();
  }
};

/* ---- Random achievement widget (any page with #random-ach) ---- */
document.addEventListener("DOMContentLoaded", async () => {
  const box = document.getElementById("random-ach");
  if (!box) return;
  const out = box.querySelector(".out");
  const btn = box.querySelector("button");
  let pool = [];
  try { pool = (await SJ.loadJSON("assets/data/lore.json")).discoveries; } catch { SJ.loadError(out); return; }
  let last = -1;
  btn.addEventListener("click", () => {
    let i;
    do { i = Math.floor(Math.random() * pool.length); } while (i === last && pool.length > 1);
    last = i;
    const d = pool[i];
    out.innerHTML = `${SJ.esc(d.text)}<span class="src">${SJ.esc(d.year)} · status: ${SJ.esc(d.status)}</span>`;
  });
});
