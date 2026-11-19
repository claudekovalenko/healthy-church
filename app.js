/* Healthy Church: what Scripture shows a church to be. Content lives in data.js; verse text in passages.js. */
(() => {
const $ = s => document.querySelector(s);
const view = $("#view"), titleEl = $("#title"), backBtn = $("#back");
const chev = `<svg class="chev" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>`;
const APP = "Healthy Church";
const PATHWAY_URL = "https://claudekovalenko.github.io/discipleship-pathway/";
const NT_START = 39; // Matthew is book 40
const SCOPES = [["all", "Whole Bible"], ["ot", "Old Testament"], ["nt", "New Testament"]];
const SECTIONS = [["The Law", 0, 4], ["History", 5, 16], ["Wisdom & Poetry", 17, 21], ["Major Prophets", 22, 26],
  ["Minor Prophets", 27, 38], ["Gospels", 39, 42], ["Acts", 43, 43], ["Paul's Letters", 44, 56],
  ["General Letters", 57, 64], ["Revelation", 65, 65]];
const sectionOf = b => SECTIONS.findIndex(s => b >= s[1] && b <= s[2]);
let scope = "all";

/* ---------- Passages ---------- */
const KEYS = Object.keys(PASSAGES);                 // canonical order (built that way)
const ORDER = new Map(KEYS.map((k, i) => [k, i]));
const bookOf = ref => PASSAGES[ref][0];
const isNT = ref => bookOf(ref) >= NT_START;
const inScope = (ref, sc = scope) => sc === "all" || (sc === "nt") === isNT(ref);
const canon = refs => [...new Set(refs)].sort((a, b) => ORDER.get(a) - ORDER.get(b));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const text = ref => PASSAGES[ref][1].map(v => v[2]).join(" ");

const CH = new Map(CHURCHES.map(c => [c[0], c]));
const KIND = new Map(KINDS);

/* Where each passage is used, so a verse can link back to every list it belongs to. */
const USES = new Map();
const use = (ref, label, href) => { if (!USES.has(ref)) USES.set(ref, []);
  const u = USES.get(ref); if (!u.some(x => x.href === href)) u.push({ label, href }); };
CHURCHES.forEach(([id, name, , secs]) => Object.values(secs).flat().forEach(r => use(r, name, `#church-${id}`)));
START.forEach(([id, cells]) => Object.values(cells).forEach(r => use(r, CH.get(id)[1], `#church-${id}`)));
const LISTS = [["mark", MARKS], ["stage", PLANTING], ["lead", LEADERS], ["mature", MATURITY], ["story", STORY]];
LISTS.forEach(([k, rows]) => rows.forEach((row, i) => row[2].forEach(r => use(r, `“${row[0]}”`, `#${k}-${i}`))));
HANDOFFS.forEach(([who, refs]) => refs.forEach(r => use(r, who, "#handoffs")));

/* One passage: the text with verse numbers, and its reference. */
function passage(ref, opts = {}) {
  const vs = PASSAGES[ref][1], many = vs.length > 1;
  const body = vs.map((v, i) => (many ? `<sup>${i > 0 && v[0] !== vs[i - 1][0] ? v[0] + ":" : ""}${v[1]}</sup>` : "") + esc(v[2])).join(" ");
  const tags = opts.tags ? (USES.get(ref) || []).filter(u => u.href !== opts.here)
    .map(u => `<a class="tag example" href="${u.href}">${esc(u.label.length > 38 ? u.label.slice(0, 36) + "…”" : u.label)}</a>`).join("") : "";
  return `<article class="pass"><p class="verse">${body}</p><span class="ref">${esc(ref)}</span>${tags ? `<div class="tags">${tags}</div>` : ""}</article>`;
}
const list = (refs, opts) => refs.map(r => passage(r, opts)).join("");

/* Passages under their canon section headings. */
function grouped(refs, opts) {
  let html = "", sec = -1;
  canon(refs).forEach(r => {
    const s = sectionOf(bookOf(r));
    if (s !== sec) { sec = s; html += `<div class="era">${SECTIONS[s][0]}</div>`; }
    html += passage(r, opts);
  });
  return html;
}

/* A strip of all 66 books; books where the list appears are filled in. */
function strip(refs, big) {
  const hit = new Set(refs.map(bookOf));
  const cell = b => `<i class="${hit.has(b) ? "on" : ""}" title="${BOOK_NAMES[b]}"></i>`;
  const ot = BOOK_NAMES.slice(0, NT_START).map((_, b) => cell(b)).join("");
  const nt = BOOK_NAMES.slice(NT_START).map((_, b) => cell(b + NT_START)).join("");
  return `<div class="strip ${big ? "big" : ""} scope-${scope}"><div class="ot">${ot}</div><div class="nt">${nt}</div></div>
    ${big ? `<div class="strip-labels"><span>Genesis</span><span>Old Testament · New Testament</span><span>Revelation</span></div>` : ""}`;
}
const otnt = refs => `Old Testament ${refs.filter(r => !isNT(r)).length} · New Testament ${refs.filter(isNT).length}`;

function scopeBar(base, refs) {
  return `<nav class="seg" aria-label="Show passages from">${SCOPES.map(([k, label]) =>
    `<a href="#${base}${k === "all" ? "" : "-" + k}" class="${scope === k ? "on" : ""}" ${scope === k ? 'aria-current="true"' : ""}>
      ${label}<small>${refs.filter(r => inScope(r, k)).length}</small></a>`).join("")}</nav>`;
}
const sfx = () => scope === "all" ? "" : "-" + scope;
const verseCount = refs => new Set(refs.flatMap(r => PASSAGES[r][1].map(v => bookOf(r) + "." + v[0] + "." + v[1]))).size;
const row = (href, title, small, extra = "") =>
  `<a class="cmdrow" href="${href}" style="--c:var(--accent)"><span class="txt"><b>${title}</b><small>${small}</small>${extra}</span>${chev}</a>`;

/* A titled list page: phrase, its verse, then every passage. Used by marks, planting, leaders, maturity, story. */
function phraseScreen(key, rows, n, o) {
  const it = rows[n]; if (!it) return null;
  const [phrase, pref, refs] = it, all = canon(refs), shown = all.filter(r => inScope(r));
  const hasOT = o.scope && all.some(r => !isNT(r));
  return { title: o.title, tab: o.tab, back: o.back, html: `
    <div class="hello"><p class="label">${o.label} ${n + 1} of ${rows.length}</p>
      <p class="phrase">“${esc(phrase)}”</p><span class="ref">${pref}</span></div>
    ${o.scope ? strip(all, true) : ""}
    ${hasOT ? scopeBar(`${key}-${n}`, all) : ""}
    <div class="thread">${o.scope ? grouped(shown, { tags: true, here: `#${key}-${n}` }) : list(o.ordered ? refs : all, { tags: true, here: `#${key}-${n}` })}</div>
    <div class="pager">
      ${n > 0 ? `<a href="#${key}-${n - 1}${sfx()}">← Previous</a>` : ""}
      ${n < rows.length - 1 ? `<a class="next" href="#${key}-${n + 1}${sfx()}">Next →</a>` : ""}
    </div>` };
}

/* ---------- Screens ---------- */
function homeScreen() {
  const all = new Set(KEYS.flatMap(k => PASSAGES[k][1].map(v => bookOf(k) + "." + v[0] + "." + v[1]))).size;
  return { title: APP, tab: "home", html: `
    <div class="charge">
      <p class="label">The church Jesus builds</p>
      <p class="verse big">${esc(text("Matthew 16:18"))}</p>
      <span class="ref">Matthew 16:18</span>
    </div>
    <div class="card" style="margin-top:16px">
      <p class="label">The first church</p>
      ${passage("Acts 2:42–47").replace('<article class="pass">', "<div>").replace("</article>", "</div>")}
    </div>

    <p class="label" style="margin-top:26px">The churches</p>
    ${row("#churches", `Every church in the New Testament`, `${CHURCHES.length} churches, Jerusalem to the seven churches of Revelation`)}

    <p class="label" style="margin-top:26px">What a healthy church is</p>
    ${row("#marks", `${MARKS.length} marks of a healthy church`, "Each traced from Genesis to Revelation")}
    ${row("#maturity", "A mature church", "Commended, corrected, and what maturity is")}

    <p class="label" style="margin-top:26px">How churches began</p>
    ${row("#planting", "From the first preaching to maturity", `${PLANTING.length} stages, in the order Acts shows them`)}
    ${row("#start", "What was there at the start", `${START.length} churches side by side: the minimum Scripture shows`)}

    <p class="label" style="margin-top:26px">Raising up leaders</p>
    ${row("#leaders", "From the apostles to faithful men", `${LEADERS.length} steps, and how the apostles left`)}
    ${row("#handoffs", "Handing on the work", "Moses to Joshua, Elijah to Elisha, Jesus to the Twelve, Paul to the elders")}

    <p class="label" style="margin-top:26px">The whole Bible</p>
    ${row("#story", "The church from Genesis to Revelation", `${STORY.length} threads, from Abraham to the bride of the Lamb`)}
    ${row("#bible", "Every verse, book by book", `${all} verses from ${new Set(KEYS.map(bookOf)).size} books · search`)}

    <p class="label" style="margin-top:26px">Its companion</p>
    <a class="cmdrow" href="${PATHWAY_URL}" style="--c:var(--s6)"><span class="txt"><b>Discipleship Pathway</b>
      <small>How a disciple is made and grows. This app is how disciples gather as a church.</small></span>${chev}</a>

    <p class="fine">Scripture quotations are from the Berean Standard Bible (BSB), dedicated to the public domain. Each passage is shown as Scripture alone. Read each one in its full context.</p>` };
}

/* Churches */
const KIND_TONE = { commended: "good", corrected: "warn" };
function churchesScreen() {
  return { title: "Churches", tab: "churches", html: `
    <p class="lead">Every church named in the New Testament, grouped in the order the gospel reached them. Each page shows only what Scripture says about that church.</p>
    ${GROUPS.map(([g, note, ids]) => `<div class="era">${g} <span class="muted">· ${note}</span></div>` + ids.map(id => {
      const [, name, where, secs] = CH.get(id);
      const refs = Object.values(secs).flat();
      const badges = KINDS.filter(([k]) => secs[k]).map(([k, label]) => `<i class="${KIND_TONE[k] || ""}">${label}</i>`).join("");
      return `<a class="rowbtn" href="#church-${id}"><span class="dot" style="--c:var(--accent)"></span>
        <span class="txt"><b>${name}</b><small>${where} · ${verseCount(refs)} verses</small><span class="badges">${badges}</span></span>${chev}</a>`;
    }).join("")).join("")}` };
}

function churchScreen(id) {
  const c = CH.get(id); if (!c) return churchesScreen();
  const [, name, where, secs] = c;
  const kinds = KINDS.filter(([k]) => secs[k]);
  const order = GROUPS.flatMap(g => g[2]).filter((x, i, a) => a.indexOf(x) === i);
  const at = order.indexOf(id), prev = order[at - 1], next = order[at + 1];
  const start = START.find(s => s[0] === id);
  return { title: name, tab: "churches", back: "#churches", html: `
    <div class="hero church"><p class="n">The church in</p><h2>${name}</h2><p class="where">${where}</p></div>
    ${kinds.length > 2 ? `<div class="jump"><div class="chips">${kinds.map(([k, l]) => `<button class="chip" data-jump="k-${k}">${l}</button>`).join("")}</div></div>` : ""}
    ${kinds.map(([k, label]) => `<div class="kind" id="k-${k}">${label} <small>${secs[k].length}</small></div>${list(secs[k], { tags: true, here: `#church-${id}` })}`).join("")}
    ${start ? `<a class="cmdrow" href="#start" style="--c:var(--accent);margin-top:18px"><span class="txt"><b>What was there at the start</b>
      <small>${name} beside the other new churches</small></span>${chev}</a>` : ""}
    <div class="pager">
      ${prev ? `<a href="#church-${prev}">← ${CH.get(prev)[1]}</a>` : ""}
      ${next ? `<a class="next" href="#church-${next}">${CH.get(next)[1]} →</a>` : ""}
    </div>` };
}

/* Marks */
function phraseList(key, rows, intro, opts = {}) {
  return `${intro}${rows.map((r, i) => { const refs = canon(r[2]);
    return `<a class="patrow" href="#${key}-${i}"><b>“${esc(r[0])}”</b><small>${r[1]}</small>
      ${opts.strip ? strip(refs) + `<span class="patmeta">${otnt(refs)}</span>` : `<span class="patmeta">${refs.length} passages</span>`}</a>`; }).join("")}`;
}
const marksScreen = () => ({ title: "Marks", tab: "marks", html: phraseList("mark", MARKS,
  `<p class="lead">What a healthy church does and is, each named by a phrase of Scripture and traced through the whole Bible. Each bar is Genesis to Revelation, one mark per book.</p>`, { strip: true }) });
const markScreen = n => phraseScreen("mark", MARKS, n, { title: "Marks", tab: "marks", back: "#marks", label: "Mark", scope: true }) || marksScreen();

/* Planting */
function plantingScreen() {
  return { title: "Planting", tab: "planting", html: `
    <p class="lead">How a church began and grew in Acts and the letters, from the first preaching to a mature church that sends out others.</p>
    <ol class="steps path">${PLANTING.map((p, i) => `<li><a href="#stage-${i}"><span class="phrase">“${esc(p[0])}”</span>
      <span class="ref">${p[1]} · ${p[2].length} passages</span></a></li>`).join("")}</ol>
    <p class="label" style="margin-top:22px">The minimum</p>
    ${row("#start", "What was there at the start", `${START.length} new churches side by side`)}
    ${row("#stay", "How long the apostles stayed", "Every place Scripture gives the time")}` };
}
const stageScreen = n => phraseScreen("stage", PLANTING, n, { title: "Planting", tab: "planting", back: "#planting", label: "Stage" }) || plantingScreen();

function startScreen() {
  const n = START.length;
  const counts = ELEMENTS.map(([k]) => START.filter(s => s[1][k]).length);
  return { title: "At the start", tab: "planting", back: "#planting", html: `
    <p class="lead">For each new church, what Scripture states was there when it began and when the apostles moved on. Tap a ✓ to read the verse. A blank means Scripture does not say, not that it was missing.</p>
    <div class="gridwrap"><table class="grid">
      <thead><tr><th></th>${ELEMENTS.map(e => `<th><span>${e[1]}</span></th>`).join("")}</tr></thead>
      <tbody>${START.map(([id, cells]) => `<tr><th><a href="#church-${id}">${CH.get(id)[1]}</a></th>${ELEMENTS.map(([k, label]) =>
        cells[k] ? `<td><button class="cell on" data-ref="${esc(cells[k])}" data-what="${esc(CH.get(id)[1] + " · " + label)}" aria-label="${esc(CH.get(id)[1] + ": " + label)}"></button></td>`
                 : `<td><span class="cell" aria-label="not stated"></span></td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>
    <div class="panel" id="panel" hidden></div>

    <p class="label" style="margin-top:22px">How often Scripture states each one</p>
    <div class="card">${ELEMENTS.map(([k, label], i) => `<div class="meter"><span>${label}</span>
      <div class="bar"><i style="width:${Math.round(counts[i] / n * 100)}%"></i></div><small>${counts[i]} of ${n}</small></div>`).join("")}</div>

    <p class="label" style="margin-top:22px">Each element, church by church</p>
    ${ELEMENTS.map(([k, label]) => `<div class="kind">${label} <small>${counts[ELEMENTS.findIndex(e => e[0] === k)]}</small></div>` +
      START.filter(s => s[1][k]).map(([id, cells]) => `<h3 class="side"><b>${CH.get(id)[1]}</b></h3>${passage(cells[k])}`).join("")).join("")}` };
}

function stayScreen() {
  const rows = GROUPS.flatMap(g => g[2]).filter((x, i, a) => a.indexOf(x) === i).map(id => CH.get(id)).filter(c => c[3].stay);
  return { title: "How long they stayed", tab: "planting", back: "#planting", html: `
    <p class="lead">Every place Scripture gives how long the apostles or their co-workers stayed with a new church.</p>
    ${rows.map(([id, name, , secs]) => `<div class="kind"><a href="#church-${id}" style="color:inherit;text-decoration:none">${name}</a></div>${list(secs.stay)}`).join("")}` };
}

/* Leaders */
function leadersScreen() {
  return { title: "Leaders", tab: "leaders", html: `
    <p class="lead">How the apostles raised up leaders, appointed them, and left the church in their hands.</p>
    <ol class="steps path">${LEADERS.map((p, i) => `<li><a href="#lead-${i}"><span class="phrase">“${esc(p[0])}”</span>
      <span class="ref">${p[1]} · ${p[2].length} passages</span></a></li>`).join("")}</ol>
    <p class="label" style="margin-top:22px">Across the whole Bible</p>
    ${row("#handoffs", "Handing on the work", HANDOFFS.map(h => h[0]).join(" · "))}` };
}
const leadScreen = n => phraseScreen("lead", LEADERS, n, { title: "Leaders", tab: "leaders", back: "#leaders", label: "Step", scope: true }) || leadersScreen();
function handoffsScreen() {
  return { title: "Handing on the work", tab: "leaders", back: "#leaders", html: `
    <p class="lead">Each time Scripture shows a leader handing the work to the next, in the order of the story.</p>
    ${HANDOFFS.map(([who, refs]) => `<div class="kind">${who}</div>${list(refs)}`).join("")}` };
}

/* Maturity and the whole Bible */
const maturityScreen = () => ({ title: "A mature church", tab: "home", back: "#home", html: phraseList("mature", MATURITY,
  `<p class="lead">What a mature church is, what immaturity looks like, the churches the apostles and the Lord commended, and those they corrected.</p>`) });
const matureScreen = n => phraseScreen("mature", MATURITY, n, { title: "A mature church", tab: "home", back: "#maturity", label: "Part" }) || maturityScreen();
const storyScreen = () => ({ title: "Genesis to Revelation", tab: "home", back: "#home", html: phraseList("story", STORY,
  `<p class="lead">The people of God gathered, from the promise to Abraham to the bride of the Lamb.</p>`, { strip: true }) });
const storyOne = n => phraseScreen("story", STORY, n, { title: "Genesis to Revelation", tab: "home", back: "#story", label: "Thread", scope: true }) || storyScreen();

/* Bible: every passage, book by book, and search */
function bibleScreen() {
  const per = new Map(); KEYS.forEach(k => per.set(bookOf(k), (per.get(bookOf(k)) || 0) + 1));
  return { title: "Bible", tab: "home", back: "#home", html: `
    <div class="search"><input id="q" type="search" placeholder="Search a word, book or reference" autocomplete="off" value="${esc(search.q)}"></div>
    <div id="results"></div>
    <div id="books">${SECTIONS.map(([name, a, b]) => `<div class="era">${name}</div><div class="books">${BOOK_NAMES.slice(a, b + 1).map((bk, j) => {
      const bi = a + j, n = per.get(bi) || 0;
      return `<a class="book ${n ? "" : "empty"}" href="#book-${bi}"><b>${bk.replace(/^(\d) /, "$1 ").replace("Song of Songs", "Song")}</b><small>${n}</small></a>`; }).join("")}</div>`).join("")}</div>`,
    after: renderSearch };
}
function bookScreen(bi) {
  const refs = KEYS.filter(k => bookOf(k) === bi);
  return { title: BOOK_NAMES[bi] || "Bible", tab: "home", back: "#bible", html:
    (refs.length ? list(refs, { tags: true }) : `<p class="muted">No passages from this book are in the app.</p>`) };
}
const search = { q: "" };
function renderSearch() {
  const box = $("#results"), books = $("#books"); if (!box) return;
  const q = search.q.trim().toLowerCase();
  if (!q) { box.innerHTML = ""; books.hidden = false; return; }
  books.hidden = true;
  const hits = KEYS.filter(k => k.toLowerCase().includes(q) || text(k).toLowerCase().includes(q));
  box.innerHTML = `<p class="count">${hits.length} passage${hits.length === 1 ? "" : "s"}</p>` + list(hits.slice(0, 120), { tags: true });
}

/* ---------- Router ---------- */
function route() {
  const parts = (location.hash.slice(1) || "home").split("-");
  const name = parts[0];
  scope = ["ot", "nt"].includes(parts[parts.length - 1]) ? parts.pop() : "all";
  const arg = parts.slice(1).join("-");
  const scr = name === "churches" ? churchesScreen()
    : name === "church" ? churchScreen(arg)
    : name === "marks" ? marksScreen()
    : name === "mark" ? markScreen(+arg)
    : name === "planting" ? plantingScreen()
    : name === "stage" ? stageScreen(+arg)
    : name === "start" ? startScreen()
    : name === "stay" ? stayScreen()
    : name === "leaders" ? leadersScreen()
    : name === "lead" ? leadScreen(+arg)
    : name === "handoffs" ? handoffsScreen()
    : name === "maturity" ? maturityScreen()
    : name === "mature" ? matureScreen(+arg)
    : name === "story" ? (arg === "" ? storyScreen() : storyOne(+arg))
    : name === "bible" ? bibleScreen()
    : name === "book" ? bookScreen(+arg)
    : homeScreen();
  view.innerHTML = scr.html;
  view.classList.remove("view-enter"); void view.offsetWidth; view.classList.add("view-enter");
  titleEl.textContent = scr.title;
  document.title = scr.title === APP ? APP : scr.title + " · " + APP;
  backBtn.hidden = !scr.back; backBtn.dataset.to = scr.back || "";
  document.querySelectorAll(".tabbar a").forEach(a => a.classList.toggle("on", a.dataset.tab === scr.tab));
  if (scr.after) scr.after();
  const page = name + "-" + arg;
  if (route.last !== page) window.scrollTo(0, 0);
  route.last = page;
}
window.addEventListener("hashchange", route);
backBtn.addEventListener("click", () => { location.hash = backBtn.dataset.to; });

view.addEventListener("input", e => { if (e.target.id === "q") { search.q = e.target.value; renderSearch(); } });
view.addEventListener("click", e => {
  const jump = e.target.closest("[data-jump]");
  if (jump) { document.getElementById(jump.dataset.jump)?.scrollIntoView({ behavior: "smooth" }); return; }
  const close = e.target.closest(".close");
  if (close) { const p = $("#panel"); p.hidden = true; view.querySelectorAll(".cell.sel").forEach(c => c.classList.remove("sel")); return; }
  const cell = e.target.closest(".cell.on");
  if (cell) {
    view.querySelectorAll(".cell.sel").forEach(c => c.classList.remove("sel"));
    cell.classList.add("sel");
    const p = $("#panel");
    p.innerHTML = passage(cell.dataset.ref).replace('<p class="verse">',
      `<button class="close" aria-label="Close">×</button><p class="label">${esc(cell.dataset.what)}</p><p class="verse">`);
    p.hidden = false;
  }
});

route();

/* ---------- PWA ---------- */
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
let deferred;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferred = e; $("#install").hidden = false; });
$("#install").addEventListener("click", async () => {
  if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; $("#install").hidden = true;
});
window.addEventListener("appinstalled", () => { $("#install").hidden = true; });
})();
