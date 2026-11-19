// Look up references in the Berean Standard Bible: node scripts/v.js "Acts 14:21–23" "Titus 1:5"
const BSB = require("./bsb.json");
const { expand } = require("./refs.js");
for (const ref of process.argv.slice(2)) {
  try {
    const { verses } = expand(ref, k => k in BSB);
    console.log(`${ref}\n  ` + verses.map(x => `[${x.v}] ${BSB[x.key]}`).join(" ") + "\n");
  } catch (e) { console.log("!! " + e.message + "\n"); }
}
