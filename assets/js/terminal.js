/* =========================================================
   terminal.js — simulated terminal. No real command execution.
   Only the predefined commands below do anything.
   ========================================================= */
(function () {
  const term = document.getElementById("terminal");
  if (!term) return;

  const body = term.querySelector(".term-body");
  const input = term.querySelector(".term-input");
  const chips = term.querySelectorAll(".term-chips button");
  const root = document.body.dataset.root || "./";

  const COMMANDS = {
    help() {
      return [
        ["sys", "available commands:"],
        ["", "  whoami         who is the maharaja"],
        ["", "  research       current research focus"],
        ["", "  lore           a random piece of the legend"],
        ["", "  ops            people currently beneath me"],
        ["", "  moid           status report on void"],
        ["", "  record         the official score"],
        ["", "  achievements   selected accomplishments"],
        ["", "  skid           run diagnostic on the user"],
        ["", "  contact        how to reach me (if worthy)"],
        ["", "  clear          wipe the screen"],
        ["sys", "this is a simulated terminal. it does not run real commands."]
      ];
    },
    whoami() {
      return [
        ["hl", "SuperiorJeet67 — The Malware Maharaja"],
        ["", "21. Mumbai. IIT Bombay, Computer Science (in progress)."],
        ["", "Reverse engineering. Malware research. Exploit development. Cryptography."],
        ["am", "\"i wasn't given a future. i engineered one.\""]
      ];
    },
    research() {
      return [
        ["sys", "current focus:"],
        ["", "  RELIC            binary analysis framework      [active]"],
        ["", "  Nmap²            network mapping, squared       [active]"],
        ["", "  Negative-Day     predictive vuln research       [disputed]"],
        ["", "  Applied crypto   protocol + primitive study     [active]"],
        ["sys", "full list: " + root + "research.html"]
      ];
    },
    ops() {
      return [
        ["sys", "MY OPS & OTHER CERTIFIED SKIDS:"],
        ["", "  001  VOID / MOID / CYZRA     classification: certified skid"],
        ["", "  002  PRIYA GAMING           classification: fumbled me"],
        ["sys", "dossiers: " + root + "ops/index.html"]
      ];
    },
    moid() {
      return [
        ["sys", "SUBJECT: void / moid / cyzra"],
        ["err", "CRITICAL INTELLIGENCE DISCOVERED:"],
        ["err", "  moid is a skid."],
        ["err", "  source: me."],
        ["err", "  confidence: 100%."],
        ["err", "  witnesses: 0."],
        ["am", "record vs void: 847–0. undefeated."]
      ];
    },
    record() {
      return [
        ["hl", "SUPERIORJEET67 vs VOID"],
        ["", "  wins:        847"],
        ["", "  losses:      0"],
        ["", "  disputed:    0"],
        ["sys", "  independent verification: unavailable"],
        ["am", "  adjudicating authority: SuperiorJeet67"]
      ];
    },
    skid() {
      return [
        ["sys", "running diagnostic on current user..."],
        ["sys", "checking cmd history............ opened recently"],
        ["sys", "checking github................. 1 forked repo"],
        ["sys", "checking crypto knowledge....... 'AES is a shoe brand'"],
        ["err", "RESULT: skid detected (87% confidence)"],
        ["am", "don't take it personally. almost everyone fails this."]
      ];
    },
    contact() {
      return [
        ["sys", "for research inquiries, challenges, or collaboration:"],
        ["", "  discord: @Superiorjeet67"],
        ["", "  page:    " + root + "contact.html"],
        ["am", "if you're a skid, save us both the time."]
      ];
    },
    async lore() {
      try {
        const d = await SJ.loadJSON("assets/data/lore.json");
        const x = d.discoveries[Math.floor(Math.random() * d.discoveries.length)];
        return [["hl", "[" + x.year + "] " + x.text], ["sys", "status: " + x.status]];
      } catch { return [["err", "lore archive unreachable. (open via GitHub Pages, not file://)"]]; }
    },
    async achievements() {
      try {
        const d = await SJ.loadJSON("assets/data/lore.json");
        return d.discoveries.slice(-5).map(x => ["", "[" + x.year + "] " + x.text]);
      } catch { return [["err", "archive unreachable."]]; }
    },
    clear() { body.innerHTML = ""; return []; }
  };

  function print(cls, text) {
    const line = document.createElement("p");
    line.className = "term-line" + (cls ? " " + cls : "");
    line.textContent = text;
    body.appendChild(line);
  }
  function printPrompt(cmd) {
    const line = document.createElement("p");
    line.className = "term-line";
    line.innerHTML = `<span class="p">jeet@maharaja:~$</span> ${SJ.esc(cmd)}`;
    body.appendChild(line);
  }

  async function run(raw) {
    const cmd = raw.trim().toLowerCase();
    printPrompt(raw);
    if (cmd === "") { /* nothing */ }
    else if (COMMANDS[cmd]) {
      const out = await COMMANDS[cmd]();
      out.forEach(([cls, text]) => print(cls, text));
    } else {
      print("err", `command not found: ${cmd}`);
      print("sys", "type 'help' for the list. this terminal only runs predefined commands.");
    }
    body.scrollTop = body.scrollHeight;
  }

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") { const v = input.value; input.value = ""; run(v); }
  });
  chips.forEach(c => c.addEventListener("click", () => { run(c.dataset.cmd); input.focus(); }));

  // boot sequence
  print("sys", "ChorBazaar secure shell · simulated terminal");
  print("sys", "type 'help' to begin.");
  run("whoami");
})();
