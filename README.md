# SuperiorJeet67 — MalwareMaharaja

A fictional, satirical cybersecurity-researcher portfolio for the Discord character **SuperiorJeet67** (alias *MalwareMaharaja*). Static site — just HTML, CSS and vanilla JavaScript. No backend, no build step, no API keys.

> **This is fiction.** SuperiorJeet67 is a made-up character. Nothing here is a real person, credential, tool, marketplace, or affiliation. See `disclaimer.html`.

---

## Publish it on GitHub Pages (free) — beginner steps

You don't need the command line for this.

1. **Make a GitHub account** at <https://github.com> if you don't have one (free).
2. Click the **+** (top right) → **New repository**.
   - **Repository name:** `superiorjeet67` (or anything you like).
   - Set it to **Public**.
   - Don't add a README (you already have one). Click **Create repository**.
3. On the new repo page, click **uploading an existing file**.
4. Open the `superiorjeet67` folder on your computer, select **everything inside it** (all the files *and* the `ops/` and `assets/` folders), and drag them into the browser. Wait for the upload to finish, then click **Commit changes**.
5. Go to the repo's **Settings** → **Pages** (left sidebar).
6. Under **Build and deployment** → **Source**, choose **Deploy from a branch**. Set the branch to **main** and the folder to **/ (root)**. Click **Save**.
7. Wait ~1 minute, refresh the Pages settings. Your live link appears at the top, like:
   `https://YOUR-USERNAME.github.io/superiorjeet67/`

That's your shareable site. 🎉

### Important: upload the folder *contents*
The site files (`index.html`, `about.html`, the `ops/` and `assets/` folders, etc.) must sit at the **root** of the repo — not inside an extra `superiorjeet67/` folder. If your link shows a file list instead of the site, you nested the folder one level too deep.

---

## Make it yours — things to edit

| What | Where |
|---|---|
| GitHub link, Discord invite, Discord handle, email | `assets/js/main.js` → the `SJ_CONFIG` block at the top |
| **Inside jokes about Moid** | `ops/moid.html` → the `Field notes (inside jokes)` list (marked with a big `EDIT ME` comment) |
| The 847–0 score & challenge log | `assets/data/leaderboard.json` |
| Research projects | `assets/data/research.json` |
| Forum threads & chat log | `assets/data/archives.json` |
| Lore / random achievements | `assets/data/lore.json` |

After editing on GitHub: open the file → pencil icon → make changes → **Commit changes**. The live site updates in about a minute.

---

## Viewing it locally (optional)

Opening the `.html` files straight from your computer (double-click) will load the look of the site, but the pages that read JSON (research, archives, leaderboard, random achievement) will show a "data didn't load" note — browsers block `file://` from reading local data files. To preview everything locally, run a tiny web server from inside the folder:

```bash
# Python 3 (already on most Macs/Linux)
python3 -m http.server 8000
# then open http://localhost:8000
```

On GitHub Pages this is a non-issue — everything just works.

---

## Discord bot integration

The site and a future bot can share one source of truth:

- `assets/data/leaderboard.json` holds the record and challenge log. A bot can read it to answer "what's the score?" and append new wins.
- `assets/data/lore.json` feeds the random-achievement button and the terminal's `lore` command.

Keep the JSON shape the same and the website will keep rendering whatever the bot writes.

---

## File layout

```
superiorjeet67/
├── index.html         home + interactive terminal
├── about.html         "The Temple Orphan" autobiography
├── experience.html    résumé / timeline
├── research.html      filterable project portfolio (modals)
├── archives.html      browsable fictional forum + chat log
├── achievements.html  accomplishments + random reveal
├── leaderboard.html   847–0 vs Void
├── contact.html       Discord / bot info
├── disclaimer.html    fictional-character disclosure
├── ops/
│   ├── index.html     the "certified skids" list
│   ├── moid.html      dossier 001 + EXPOSE MOID button
│   └── priya.html     dossier 002 (fictional)
├── assets/
│   ├── css/styles.css
│   ├── js/            main.js · terminal.js · archive.js
│   ├── data/          research · archives · lore · leaderboard (JSON)
│   └── images/        (empty — add your own if you want)
├── .nojekyll
└── README.md
```

Built for laughs, not for ops.
