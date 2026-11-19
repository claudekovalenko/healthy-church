# Healthy Church

What Scripture shows a church to be, from Genesis to Revelation: every church in the New Testament, how churches began and what was there at the start, how leaders were raised up and the work handed on, what a mature church is, and the marks of a healthy church traced through the whole Bible.

It is the companion to [Discipleship Pathway](https://claudekovalenko.github.io/discipleship-pathway/): that app is how a disciple is made and grows; this one is how disciples gather and grow as a church. Both use the same layout and the same rule.

An installable app (PWA) that works offline once it has been opened.

**Live site:** https://claudekovalenko.github.io/healthy-church/ (published by GitHub Actions on every push, once Pages is turned on for the repository: Settings → Pages → Source: GitHub Actions)

## What's inside

- **Churches:** all 32 churches named in the New Testament, in the order the gospel reached them: Jerusalem, Samaria, Damascus, Lydda and Joppa, Caesarea, Antioch; the churches of Paul's three journeys (Pisidian Antioch, Iconium, Lystra, Derbe, Galatia, Philippi, Thessalonica, Berea, Athens, Corinth, Ephesus, Troas, Colossae, Laodicea); Rome, Crete and the disciples along the coast; the churches of Hebrews, James, 1 Peter and John's letters; and the seven churches of Revelation. Each page shows only what Scripture says about that church, under: how it began, how long they stayed, life together, leaders, when the apostles left, strengthened afterward, partnership with other churches, sent out, suffering, commended, corrected.
- **Marks:** 22 marks of a healthy church, each named by a phrase of Scripture (most from Acts 2:42–47) and traced through the whole Bible, with a Whole Bible · Old Testament · New Testament switch and a bar of all 66 books.
- **Planting:** the life of a church in ten stages, in the order Acts shows them, from "They preached the gospel to that city" (Acts 14:21) to "as we mature to the full measure of the stature of Christ" (Ephesians 4:13).
  - **What was there at the start:** fifteen new churches side by side against ten elements (word preached, believed, baptized, Holy Spirit, met in a home, taught and strengthened, leaders named, apostles left, persecuted, time stated). Every ✓ opens the verse that states it. A blank means Scripture does not say, not that it was missing.
  - **How long the apostles stayed:** every place Scripture gives the time, from "three Sabbaths" in Thessalonica to "three years" in Ephesus.
- **Timelines:** every church page opens with a summary chart: when it began, how long the apostles stayed (in Scripture's words), when leaders were first named and how long after it began, and the last word Scripture gives about it. Below that is a line from AD 30 to 95 and every event in order; tap one to read its verse. The **Timeline** page (`#timeline`) puts all 32 churches on one chart, with a table from beginning to leaders. Years are approximate, following a common chronology anchored on Gallio's term in Corinth (AD 51–52); Scripture gives the order and the lengths of stay, not the years.
- **Sent, appointed, recognized** (`#commission`): workers were sent, leaders were appointed, some churches began with no one sent, and every church was then recognized and strengthened by the wider church.
- **Leaders:** eleven steps, from "Imitate me, just as I imitate Christ" to "entrust these to faithful men", and **Handing on the work** across the whole Bible: Moses to Joshua, Joshua to the elders, Samuel, David to Solomon, Elijah to Elisha, Jesus to the Twelve, Paul to the Ephesian elders and to Timothy, Peter to the churches.
- **A mature church:** what maturity is, immaturity named, the churches the apostles and the Lord commended, those they corrected, and the glorious church Christ will present to Himself.
- **Genesis to Revelation:** nine threads, from "all the families of the earth will be blessed through you" to "the bride, the wife of the Lamb".
- **Bible:** every passage, book by book, and search. Each passage links to every list it appears in.
- **The whole study as one document:** [HEALTHY-CHURCH.md](HEALTHY-CHURCH.md).

## The rule

A verse is listed only when its own words plainly show the point, so a reader can see the link without an explanation. Every title is a phrase quoted from the verse named beside it, and the build checks that the phrase is really there. Each passage is shown as Scripture alone.

## Files

| File | Purpose |
|---|---|
| `index.html` | App shell: top bar and tab bar |
| `app.css` | Styles, including light and dark mode (shared with Discipleship Pathway) |
| `app.js` | Screens and navigation |
| `data.js` | **All the content, as references:** churches, marks, planting, leaders, maturity, story |
| `passages.js` | The verse text for every reference. Generated; do not edit |
| `manifest.webmanifest`, `sw.js`, `icons/` | What makes it installable and offline |
| `HEALTHY-CHURCH.md` | Every list with every verse, as one document. Generated |
| `scripts/bsb.json` | The Berean Standard Bible text, used by the build |
| `scripts/build.js` | Builds `passages.js`, checks every reference and every title phrase |
| `scripts/compile.js` | Rebuilds `HEALTHY-CHURCH.md` |
| `scripts/v.js` | Look up a reference: `node scripts/v.js "Acts 14:21–23"` |

## Editing

All content is in `data.js`, as references only (for example `"Acts 14:21–23"`, `"Romans 16:3–5, 16"`, `"Philemon 4–7"`). The text comes from the Berean Standard Bible.

1. Add or change references in `data.js`.
2. Run `node scripts/build.js`. It fails with a message if a reference doesn't exist or a title phrase isn't in its verse. `node scripts/build.js --review` also prints every list with its text, for proofreading.
3. Run `node scripts/compile.js` to rebuild `HEALTHY-CHURCH.md`.
4. Bump `CACHE` in `sw.js` (e.g. `hc-v1` → `hc-v2`) so installed apps download the update.

To try it locally, run `python3 -m http.server` in this folder and open http://localhost:8000.

## Scripture

Scripture quotations are from the Berean Standard Bible (BSB). The BSB was dedicated to the public domain in 2023, so this app can quote as many verses as it needs (it quotes about 930), with no permission limit.
