// Shared by the build script and the lookup tool: parse a reference such as
// "Acts 14:21–23", "Romans 16:3–5, 16", "Acts 19:8–20:1" or "Philemon 4–7"
// into a list of [osisKey, chapter, verse].
const BOOKS = [
  ["Genesis","Gen"],["Exodus","Exod"],["Leviticus","Lev"],["Numbers","Num"],["Deuteronomy","Deut"],
  ["Joshua","Josh"],["Judges","Judg"],["Ruth","Ruth"],["1 Samuel","1Sam"],["2 Samuel","2Sam"],
  ["1 Kings","1Kgs"],["2 Kings","2Kgs"],["1 Chronicles","1Chr"],["2 Chronicles","2Chr"],["Ezra","Ezra"],
  ["Nehemiah","Neh"],["Esther","Esth"],["Job","Job"],["Psalms","Ps"],["Proverbs","Prov"],
  ["Ecclesiastes","Eccl"],["Song of Songs","Song"],["Isaiah","Isa"],["Jeremiah","Jer"],["Lamentations","Lam"],
  ["Ezekiel","Ezek"],["Daniel","Dan"],["Hosea","Hos"],["Joel","Joel"],["Amos","Amos"],["Obadiah","Obad"],
  ["Jonah","Jonah"],["Micah","Mic"],["Nahum","Nah"],["Habakkuk","Hab"],["Zephaniah","Zeph"],["Haggai","Hag"],
  ["Zechariah","Zech"],["Malachi","Mal"],["Matthew","Matt"],["Mark","Mark"],["Luke","Luke"],["John","John"],
  ["Acts","Acts"],["Romans","Rom"],["1 Corinthians","1Cor"],["2 Corinthians","2Cor"],["Galatians","Gal"],
  ["Ephesians","Eph"],["Philippians","Phil"],["Colossians","Col"],["1 Thessalonians","1Thess"],
  ["2 Thessalonians","2Thess"],["1 Timothy","1Tim"],["2 Timothy","2Tim"],["Titus","Titus"],["Philemon","Phlm"],
  ["Hebrews","Heb"],["James","Jas"],["1 Peter","1Pet"],["2 Peter","2Pet"],["1 John","1John"],["2 John","2John"],
  ["3 John","3John"],["Jude","Jude"],["Revelation","Rev"]
];
const ONE_CHAPTER = new Set(["Obad","Phlm","2John","3John","Jude"]);

function bookOf(ref) {
  let best = -1, len = 0;
  BOOKS.forEach(([name], i) => [name, name === "Psalms" ? "Psalm" : ""].forEach(n => {
    if (n && ref.startsWith(n + " ") && n.length > len) { best = i; len = n.length; }
  }));
  if (best < 0) throw new Error("Unknown book in: " + ref);
  return [best, ref.slice(len + 1)];
}

/** Expand a reference into verses: [{key, c, v}] in order. `has(key)` says whether a verse exists. */
function expand(ref, has) {
  const [bi, rest] = bookOf(ref);
  const osis = BOOKS[bi][1];
  const out = [];
  const push = (c, v) => {
    const key = `${osis}.${c}.${v}`;
    if (!has(key)) throw new Error(`No verse ${key} (from "${ref}")`);
    out.push({ key, c, v });
  };
  let chap = ONE_CHAPTER.has(osis) ? 1 : null;
  for (const raw of rest.split(/,\s*/)) {
    const seg = raw.trim();
    const [a, b] = seg.split(/[–-]/);
    let c1 = chap, v1;
    if (a.includes(":")) [c1, v1] = a.split(":").map(Number); else v1 = Number(a);
    if (c1 == null || !v1) throw new Error(`Bad reference "${ref}"`);
    chap = c1;
    if (b === undefined) { push(c1, v1); continue; }
    let c2 = c1, v2;
    if (b.includes(":")) [c2, v2] = b.split(":").map(Number); else v2 = Number(b);
    for (let c = c1; c <= c2; c++) {
      const start = c === c1 ? v1 : 1;
      for (let v = start; ; v++) {
        if (c === c2 && v > v2) break;
        const key = `${osis}.${c}.${v}`;
        if (!has(key)) { if (c < c2) break; throw new Error(`No verse ${key} (from "${ref}")`); }
        push(c, v);
      }
    }
    chap = c2;
  }
  return { book: bi, verses: out };
}

module.exports = { BOOKS, expand, bookOf };
