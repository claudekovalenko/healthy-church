// Rebuilds HEALTHY-CHURCH.md: every list in the app, with every verse, as one document.
//   node scripts/compile.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "passages.js"), "utf8") + "\n" +
  fs.readFileSync(path.join(root, "data.js"), "utf8") +
  "\nthis.D={COMMISSION,TIMELINE,EVENT_TYPES,PASSAGES,KINDS,CHURCHES,GROUPS,ELEMENTS,START,PLANTING,MARKS,STORY,LEADERS,HANDOFFS,MATURITY};", ctx);
const D = ctx.D;
const KEYS = Object.keys(D.PASSAGES), ORDER = new Map(KEYS.map((k, i) => [k, i]));
const canon = refs => [...new Set(refs)].sort((a, b) => ORDER.get(a) - ORDER.get(b));
const verse = ref => {
  const vs = D.PASSAGES[ref][1];
  const body = vs.map((v, i) => (vs.length > 1 ? `<sup>${v[1]}</sup>` : "") + v[2]).join(" ");
  return `> ${body} (${ref})\n`;
};
const slug = s => s.toLowerCase().replace(/[^a-z0-9 -]/g, "").trim().replace(/\s+/g, "-");
const CH = new Map(D.CHURCHES.map(c => [c[0], c]));
const out = [];
const h = (level, title) => out.push(`${"#".repeat(level)} ${title}\n`);

out.push(`# Healthy Church\n\nWhat Scripture shows a church to be: every church in the New Testament, how churches began, how leaders were raised up and the work handed on, what maturity is, and the marks of a healthy church traced from Genesis to Revelation.\n\nScripture quotations are from the Berean Standard Bible (BSB), dedicated to the public domain. A verse is listed only when its own words plainly show the point.\n`);
out.push(`## Contents\n\n1. [The churches](#the-churches)\n2. [Marks of a healthy church](#marks-of-a-healthy-church)\n3. [How churches began](#how-churches-began)\n4. [What was there at the start](#what-was-there-at-the-start)\n4b. [Timeline of every church](#timeline-of-every-church) · [Sent, appointed, recognized](#sent-appointed-recognized)\n5. [Raising up leaders](#raising-up-leaders)\n6. [Handing on the work](#handing-on-the-work)\n7. [A mature church](#a-mature-church)\n8. [The church from Genesis to Revelation](#the-church-from-genesis-to-revelation)\n`);

h(2, "The churches");
const seen = new Set();
D.GROUPS.forEach(([g, note, ids]) => {
  h(3, `${g} (${note})`);
  ids.forEach(id => {
    const [, name, where, secs] = CH.get(id);
    if (seen.has(id)) { out.push(`- **${name}**: see above.\n`); return; }
    seen.add(id);
    h(4, `${name} · ${where}`);
    D.KINDS.filter(([k]) => secs[k]).forEach(([k, label]) => {
      out.push(`**${label}**\n`);
      secs[k].forEach(r => out.push(verse(r)));
    });
  });
});

const phrased = (title, rows, sort = true) => {
  h(2, title);
  rows.forEach(([phrase, pref, refs], i) => {
    h(3, `${i + 1}. “${phrase}” (${pref})`);
    (sort ? canon(refs) : refs).forEach(r => out.push(verse(r)));
  });
};
phrased("Marks of a healthy church", D.MARKS);
phrased("How churches began", D.PLANTING);

h(2, "What was there at the start");
out.push("A blank means Scripture does not say, not that it was missing.\n");
out.push(`| Church | ${D.ELEMENTS.map(e => e[1]).join(" | ")} |\n|---|${D.ELEMENTS.map(() => ":-:").join("|")}|`);
D.START.forEach(([id, cells]) => out.push(`| ${CH.get(id)[1]} | ${D.ELEMENTS.map(([k]) => cells[k] || "").join(" | ")} |`));
out.push("");

h(2, "Timeline of every church");
out.push("Years are approximate (AD), following a commonly used chronology. Scripture gives the order and the length of each stay, not the years. Gallio's term in Corinth (Acts 18:12) is fixed by an inscription at AD 51–52, and the other years are counted from it.\n");
const TN = new Map(D.EVENT_TYPES);
const seenT = new Set();
D.GROUPS.flatMap(g => g[2]).forEach(id => {
  if (seenT.has(id)) return; seenT.add(id);
  const ev = (D.TIMELINE[id] || []).map((e, i) => [i, e]).sort((a, b) => a[1][0] - b[1][0] || a[0] - b[0]).map(x => x[1]);
  h(3, CH.get(id)[1]);
  out.push("| Year | | What happened | Scripture |\n|---|---|---|---|");
  ev.forEach(([y, t, label, ref, q, end]) => out.push(`| c. ${y}${end ? "–" + end : ""} | ${TN.get(t)} | ${label} | “${q}” (${ref}) |`));
  out.push("");
});
h(2, "Sent, appointed, recognized");
D.COMMISSION.forEach(([head, phrase, pref, refs]) => { h(3, `${head}: “${phrase}” (${pref})`); canon(refs).forEach(r => out.push(verse(r))); });

phrased("Raising up leaders", D.LEADERS);
h(2, "Handing on the work");
D.HANDOFFS.forEach(([who, refs]) => { h(3, who); refs.forEach(r => out.push(verse(r))); });
phrased("A mature church", D.MATURITY);
phrased("The church from Genesis to Revelation", D.STORY);

fs.writeFileSync(path.join(root, "HEALTHY-CHURCH.md"), out.join("\n"));
console.log("HEALTHY-CHURCH.md written.");
