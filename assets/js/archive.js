/* =========================================================
   archive.js — renders the forum thread browser + chatlog
   from assets/data/archives.json
   ========================================================= */
(function () {
  const listEl = document.getElementById("thread-list");
  const viewEl = document.getElementById("forum-view");
  const chatEl = document.getElementById("chatlog");
  if (!listEl && !chatEl) return;

  function avatar(name) {
    return name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "??";
  }

  function renderThread(t) {
    const posts = t.posts.map(p => `
      <article class="post ${p.op ? "op" : ""}">
        <div class="post-user">
          <span class="avatar" aria-hidden="true">${SJ.esc(avatar(p.user))}</span>
          <span class="uname">${SJ.esc(p.user)}</span>
          <span class="urank">${SJ.esc(p.rank || "Member")}</span>
          <span class="urank">rep: ${SJ.esc(p.rep || "0")}</span>
        </div>
        <div class="post-body">
          <div class="pdate">${SJ.esc(p.date)}</div>
          ${p.body}
          ${p.sig ? `<div class="sig">— ${SJ.esc(p.sig)}</div>` : ""}
        </div>
      </article>`).join("");
    viewEl.innerHTML = `
      <div class="forum-head">
        <span>${SJ.esc(t.board)}</span>
        <span>${t.posts.length} posts · reconstructed</span>
      </div>
      <div class="forum-title"><h2>${SJ.esc(t.title)}</h2>
        <div class="mono faint" style="font-size:12px">thread opened ${SJ.esc(t.date)}</div></div>
      ${posts}`;
    viewEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  SJ.loadJSON("assets/data/archives.json").then(data => {
    // thread list
    data.threads.forEach((t, i) => {
      const b = document.createElement("button");
      b.innerHTML = `<span class="t-title">${SJ.esc(t.title)}</span>
        <span class="t-meta">${SJ.esc(t.board)} · ${t.posts.length} posts</span>`;
      b.addEventListener("click", () => {
        listEl.querySelectorAll("button").forEach(x => x.removeAttribute("aria-current"));
        b.setAttribute("aria-current", "true");
        renderThread(t);
      });
      if (i === 0) b.setAttribute("aria-current", "true");
      listEl.appendChild(b);
    });
    if (data.threads[0]) renderThread(data.threads[0]);

    // chatlog
    if (chatEl && data.chatlog) {
      chatEl.innerHTML = data.chatlog.map(([time, user, msg]) => {
        const cls = user === "SuperiorJeet67" ? "green" : user === "Void" ? "red" : "violet";
        return `<p class="term-line"><span class="faint">[${SJ.esc(time)}]</span> <span class="${cls}">&lt;${SJ.esc(user)}&gt;</span> ${SJ.esc(msg)}</p>`;
      }).join("");
    }
  }).catch(() => {
    if (listEl) SJ.loadError(listEl);
    if (chatEl) SJ.loadError(chatEl);
  });
})();
