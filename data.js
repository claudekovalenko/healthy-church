// Healthy Church: what Scripture shows a church to be, from Genesis to Revelation.
// All Scripture is the Berean Standard Bible (public domain). Verse text is filled in by
// scripts/build.js into passages.js; this file holds only references.
//
// The rule for every list: a verse is listed only when its own words plainly show the point,
// so a reader can see the link without an explanation.
// Every phrase used as a title is quoted from the verse named beside it (build.js checks this).

// Kinds of section on a church's page, in the order they are shown.
const KINDS = [
  ["begin",     "How it began"],
  ["stay",      "How long they stayed"],
  ["life",      "Life together"],
  ["leaders",   "Leaders"],
  ["left",      "When the apostles left"],
  ["after",     "Strengthened afterward"],
  ["partners",  "Partnership with other churches"],
  ["sent",      "Sent out"],
  ["suffered",  "Suffering"],
  ["commended", "Commended"],
  ["corrected", "Corrected"]
];

// Every church named in the New Testament: [id, name, where, sections {kind: [references]}]
const CHURCHES = [
  ["jerusalem", "Jerusalem", "Judea · Acts 1–15", {
    begin: ["Acts 1:14–15", "Acts 2:1–4", "Acts 2:36–41"],
    life: ["Acts 2:42–47", "Acts 4:23–24", "Acts 4:31", "Acts 4:32–35", "Acts 5:12–14", "Acts 5:42", "Acts 12:5", "Acts 12:12"],
    leaders: ["Acts 6:2–6", "Acts 11:30", "Acts 15:4", "Acts 15:6", "Acts 15:22–23", "Acts 21:17–18", "Galatians 2:9"],
    suffered: ["Acts 4:1–3", "Acts 5:40–41", "Acts 8:1", "Acts 12:1–3"],
    sent: ["Acts 8:4", "Acts 8:14", "Acts 11:19–20", "Acts 11:22", "Acts 15:27"],
    partners: ["Acts 11:29–30", "Romans 15:26–27", "1 Corinthians 16:3"],
    commended: ["Acts 6:7", "Acts 21:20", "1 Thessalonians 2:14"],
    corrected: ["Acts 5:1–5", "Acts 6:1", "Acts 15:24"]
  }],
  ["samaria", "Samaria", "with Judea and Galilee · Acts 8–9", {
    begin: ["Acts 8:5–8", "Acts 8:12"],
    after: ["Acts 8:14–17", "Acts 8:25"],
    commended: ["Acts 9:31"]
  }],
  ["damascus", "Damascus", "Syria · Acts 9", {
    begin: ["Acts 9:10", "Acts 9:19"],
    life: ["Acts 9:25"]
  }],
  ["lydda", "Lydda and Joppa", "the coastal plain · Acts 9", {
    begin: ["Acts 9:32", "Acts 9:35", "Acts 9:42"],
    life: ["Acts 9:36", "Acts 9:38", "Acts 9:41"]
  }],
  ["caesarea", "Caesarea", "the house of Cornelius · Acts 10", {
    begin: ["Acts 10:24", "Acts 10:33", "Acts 10:44–48", "Acts 11:12"],
    stay: ["Acts 10:48"],
    life: ["Acts 21:8–9", "Acts 21:16"]
  }],
  ["antioch", "Antioch in Syria", "the first Gentile church · Acts 11–15", {
    begin: ["Acts 11:19–21"],
    after: ["Acts 11:22–24", "Acts 15:30–32"],
    stay: ["Acts 11:25–26", "Acts 14:28"],
    leaders: ["Acts 13:1"],
    partners: ["Acts 11:27–30", "Acts 15:2"],
    sent: ["Acts 13:2–3", "Acts 14:26–27", "Acts 15:35", "Acts 15:40"],
    corrected: ["Acts 15:1", "Galatians 2:11–14"]
  }],
  ["pisidian-antioch", "Pisidian Antioch", "Galatia · Acts 13", {
    begin: ["Acts 13:14–15", "Acts 13:42–44", "Acts 13:48–49"],
    life: ["Acts 13:52"],
    left: ["Acts 13:50–51"],
    after: ["Acts 14:21–22"],
    leaders: ["Acts 14:23"]
  }],
  ["iconium", "Iconium", "Galatia · Acts 14", {
    begin: ["Acts 14:1"],
    stay: ["Acts 14:3"],
    left: ["Acts 14:4–6"],
    after: ["Acts 14:21–22"],
    leaders: ["Acts 14:23"],
    commended: ["Acts 16:2"]
  }],
  ["lystra", "Lystra", "Galatia · Acts 14", {
    begin: ["Acts 14:6–7", "Acts 14:20"],
    suffered: ["Acts 14:19"],
    left: ["Acts 14:20"],
    after: ["Acts 14:21–22", "Acts 16:1"],
    leaders: ["Acts 14:23"],
    sent: ["Acts 16:2–3"]
  }],
  ["derbe", "Derbe", "Galatia · Acts 14", {
    begin: ["Acts 14:20–21"],
    after: ["Acts 16:1"],
    sent: ["Acts 20:4"]
  }],
  ["galatia", "The churches of Galatia", "Paul's letter to them", {
    begin: ["Galatians 1:1–2", "Galatians 3:1–2", "Galatians 4:13–14"],
    life: ["Galatians 5:13", "Galatians 6:1–2", "Galatians 6:6", "Galatians 6:10"],
    after: ["Acts 16:4–5", "Acts 18:23", "Galatians 4:19–20"],
    partners: ["1 Corinthians 16:1"],
    commended: ["Galatians 4:14–15", "Galatians 5:7"],
    corrected: ["Galatians 1:6–7", "Galatians 3:3", "Galatians 5:15"]
  }],
  ["philippi", "Philippi", "Macedonia · Acts 16", {
    begin: ["Acts 16:12–15", "Acts 16:30–34"],
    stay: ["Acts 16:12", "Acts 16:18"],
    left: ["Acts 16:40"],
    leaders: ["Philippians 1:1"],
    life: ["Philippians 1:27", "Philippians 2:1–4"],
    after: ["Acts 20:1–2", "Acts 20:6", "Philippians 2:19–20", "Philippians 2:25"],
    partners: ["Philippians 1:3–5", "Philippians 4:14–18", "2 Corinthians 8:1–5", "2 Corinthians 11:9"],
    suffered: ["Acts 16:22–24", "Philippians 1:29–30"],
    commended: ["Philippians 1:6–7", "Philippians 2:12", "Philippians 4:1"],
    corrected: ["Philippians 4:2–3"]
  }],
  ["thessalonica", "Thessalonica", "Macedonia · Acts 17", {
    begin: ["Acts 17:1–4", "1 Thessalonians 1:5–6", "1 Thessalonians 1:9–10", "1 Thessalonians 2:13"],
    stay: ["Acts 17:2"],
    life: ["Acts 17:5–7", "1 Thessalonians 5:11", "1 Thessalonians 5:14"],
    left: ["Acts 17:10", "1 Thessalonians 2:17"],
    after: ["1 Thessalonians 3:1–3", "1 Thessalonians 3:6", "1 Thessalonians 3:10"],
    leaders: ["1 Thessalonians 5:12–13"],
    sent: ["1 Thessalonians 1:7–8", "Acts 20:4"],
    suffered: ["1 Thessalonians 2:14", "1 Thessalonians 3:3–4", "2 Thessalonians 1:4"],
    commended: ["1 Thessalonians 1:2–3", "1 Thessalonians 4:9–10", "2 Thessalonians 1:3"],
    corrected: ["2 Thessalonians 3:6", "2 Thessalonians 3:11–12"]
  }],
  ["berea", "Berea", "Macedonia · Acts 17", {
    begin: ["Acts 17:10–12"],
    left: ["Acts 17:13–14"],
    sent: ["Acts 20:4"]
  }],
  ["athens", "Athens", "Achaia · Acts 17", {
    begin: ["Acts 17:16–17", "Acts 17:32–34"],
    left: ["Acts 18:1"]
  }],
  ["corinth", "Corinth", "Achaia · Acts 18", {
    begin: ["Acts 18:1–8", "1 Corinthians 2:1–2", "1 Corinthians 3:6"],
    stay: ["Acts 18:11", "Acts 18:18"],
    life: ["1 Corinthians 11:23–26", "1 Corinthians 12:27", "1 Corinthians 14:26", "1 Corinthians 14:40"],
    leaders: ["1 Corinthians 16:15–16", "Romans 16:1–2"],
    left: ["Acts 18:18"],
    after: ["Acts 18:27–28", "1 Corinthians 4:17", "2 Corinthians 7:6–7"],
    partners: ["1 Corinthians 16:1–3", "2 Corinthians 9:2"],
    commended: ["1 Corinthians 1:4–7", "2 Corinthians 7:11", "2 Corinthians 8:7"],
    corrected: ["1 Corinthians 1:10–11", "1 Corinthians 3:1–3", "1 Corinthians 5:1–2", "1 Corinthians 11:17–18"]
  }],
  ["ephesus", "Ephesus", "Asia · Acts 18–20", {
    begin: ["Acts 18:19–21", "Acts 18:24–26", "Acts 19:1–7"],
    stay: ["Acts 19:8–10", "Acts 20:31"],
    life: ["Acts 19:18–20", "Acts 20:20"],
    leaders: ["Acts 20:17", "Acts 20:28"],
    left: ["Acts 20:25", "Acts 20:29–32", "Acts 20:36–38"],
    after: ["1 Timothy 1:3", "1 Timothy 3:14–15", "Ephesians 6:21–22"],
    sent: ["Acts 19:10", "Acts 19:22"],
    commended: ["Ephesians 1:15–16", "Revelation 2:2–3", "Revelation 2:6"],
    corrected: ["Revelation 2:4–5"]
  }],
  ["troas", "Troas", "Asia · Acts 20", {
    begin: ["2 Corinthians 2:12"],
    stay: ["Acts 20:6"],
    life: ["Acts 20:7–8", "Acts 20:11"]
  }],
  ["colossae", "Colossae", "planted by Epaphras", {
    begin: ["Colossians 1:3–8", "Colossians 2:1"],
    life: ["Colossians 3:12–13", "Colossians 3:16", "Philemon 1–2"],
    leaders: ["Colossians 4:12–13", "Colossians 4:17"],
    after: ["Colossians 4:7–9", "Colossians 4:16"],
    commended: ["Colossians 2:5", "Philemon 4–7"]
  }],
  ["laodicea", "Laodicea and Hierapolis", "near Colossae", {
    begin: ["Colossians 2:1", "Colossians 4:13"],
    life: ["Colossians 4:15–16"],
    corrected: ["Revelation 3:14–17", "Revelation 3:19–20"]
  }],
  ["rome", "Rome", "Paul's letter to them; Acts 28", {
    begin: ["Acts 2:10", "Romans 1:7"],
    life: ["Romans 16:3–5", "Romans 16:14–15"],
    after: ["Romans 1:11–12", "Romans 15:22–24", "Acts 28:14–15", "Acts 28:30–31"],
    commended: ["Romans 1:8", "Romans 15:14", "Romans 16:19"],
    corrected: ["Romans 14:1", "Romans 16:17"]
  }],
  ["crete", "Crete", "Paul's letter to Titus", {
    begin: ["Acts 2:11"],
    left: ["Titus 1:5"],
    leaders: ["Titus 1:5–9"],
    life: ["Titus 2:1–5", "Titus 3:14"],
    corrected: ["Titus 1:10–11", "Titus 1:13"]
  }],
  ["coast", "Tyre, Ptolemais, Sidon and Puteoli", "disciples along Paul's way · Acts 21–28", {
    life: ["Acts 21:3–6", "Acts 21:7", "Acts 27:3", "Acts 28:13–14"]
  }],
  ["dispersion", "The churches of 1 Peter", "Pontus, Galatia, Cappadocia, Asia, Bithynia", {
    begin: ["1 Peter 1:1–2", "1 Peter 2:9–10"],
    life: ["1 Peter 4:8–11", "1 Peter 5:5"],
    leaders: ["1 Peter 5:1–4"],
    suffered: ["1 Peter 4:12–14", "1 Peter 5:8–10"],
    commended: ["1 Peter 1:8"]
  }],
  ["hebrews", "The church of Hebrews", "the letter to the Hebrews", {
    life: ["Hebrews 10:24–25", "Hebrews 13:1–2", "Hebrews 13:16"],
    leaders: ["Hebrews 13:7", "Hebrews 13:17"],
    suffered: ["Hebrews 10:32–34", "Hebrews 13:3"],
    commended: ["Hebrews 6:10"],
    corrected: ["Hebrews 5:11–14"]
  }],
  ["james", "The church of James", "the twelve tribes in the dispersion", {
    begin: ["James 1:1"],
    leaders: ["James 5:14–16"],
    corrected: ["James 2:1–4", "James 4:1"]
  }],
  ["john", "The churches of John's letters", "2 and 3 John", {
    begin: ["2 John 1", "3 John 1"],
    life: ["2 John 4–5", "3 John 5–8"],
    commended: ["3 John 3–4", "3 John 12"],
    corrected: ["2 John 10", "3 John 9–10"]
  }],
  ["smyrna", "Smyrna", "Revelation 2", { commended: ["Revelation 2:8–9"], suffered: ["Revelation 2:10–11"] }],
  ["pergamum", "Pergamum", "Revelation 2", { commended: ["Revelation 2:12–13"], corrected: ["Revelation 2:14–17"] }],
  ["thyatira", "Thyatira", "Revelation 2", { commended: ["Revelation 2:18–19", "Revelation 2:24–25"], corrected: ["Revelation 2:20"] }],
  ["sardis", "Sardis", "Revelation 3", { corrected: ["Revelation 3:1–3"], commended: ["Revelation 3:4–5"] }],
  ["philadelphia", "Philadelphia", "Revelation 3", { commended: ["Revelation 3:7–10"] }]
];

// How the churches are grouped on the Churches tab: [title, note, ids]
const GROUPS = [
  ["Jerusalem, Judea and Samaria", "Acts 1:8", ["jerusalem", "samaria", "damascus", "lydda", "caesarea"]],
  ["Antioch, the sending church", "Acts 11–15", ["antioch"]],
  ["Paul's first journey", "Acts 13–14", ["pisidian-antioch", "iconium", "lystra", "derbe", "galatia"]],
  ["Paul's second journey", "Acts 16–18", ["philippi", "thessalonica", "berea", "athens", "corinth"]],
  ["Paul's third journey and the churches of Asia", "Acts 18–20", ["ephesus", "troas", "colossae", "laodicea"]],
  ["Rome and beyond", "Acts 21–28, Romans, Titus", ["rome", "crete", "coast"]],
  ["Churches in the other letters", "Hebrews to 3 John", ["dispersion", "hebrews", "james", "john"]],
  ["The seven churches of Revelation", "Revelation 2–3", ["ephesus", "smyrna", "pergamum", "thyatira", "sardis", "philadelphia", "laodicea"]]
];

// What was there when each new church began: the elements, and for each church the verse
// that states each element. A blank means Scripture does not say, not that it was missing.
const ELEMENTS = [
  ["word",     "Word preached"],
  ["believed", "Believed"],
  ["baptized", "Baptized"],
  ["spirit",   "Holy Spirit"],
  ["home",     "Met in a home"],
  ["taught",   "Taught and strengthened"],
  ["elders",   "Leaders named"],
  ["left",     "Apostles left"],
  ["suffered", "Persecuted"],
  ["time",     "Time stated"]
];
const START = [
  ["jerusalem",       { word: "Acts 2:14", believed: "Acts 4:4", baptized: "Acts 2:41", spirit: "Acts 2:4", home: "Acts 2:46", taught: "Acts 2:42", elders: "Acts 6:3", suffered: "Acts 8:1" }],
  ["samaria",         { word: "Acts 8:5", believed: "Acts 8:12", baptized: "Acts 8:12", spirit: "Acts 8:17", taught: "Acts 8:25", left: "Acts 8:25" }],
  ["caesarea",        { word: "Acts 10:44", believed: "Acts 11:17", baptized: "Acts 10:48", spirit: "Acts 10:44", home: "Acts 11:12", taught: "Acts 10:33", time: "Acts 10:48" }],
  ["antioch",         { word: "Acts 11:20", believed: "Acts 11:21", taught: "Acts 11:26", elders: "Acts 13:1", time: "Acts 11:26" }],
  ["pisidian-antioch",{ word: "Acts 13:44", believed: "Acts 13:48", spirit: "Acts 13:52", taught: "Acts 14:22", elders: "Acts 14:23", left: "Acts 14:23", suffered: "Acts 13:50" }],
  ["iconium",         { word: "Acts 14:1", believed: "Acts 14:1", taught: "Acts 14:22", elders: "Acts 14:23", left: "Acts 14:23", suffered: "Acts 14:5", time: "Acts 14:3" }],
  ["lystra",          { word: "Acts 14:7", believed: "Acts 14:20", taught: "Acts 14:22", elders: "Acts 14:23", left: "Acts 14:23", suffered: "Acts 14:19" }],
  ["derbe",           { word: "Acts 14:21", believed: "Acts 14:21" }],
  ["philippi",        { word: "Acts 16:13", believed: "Acts 16:34", baptized: "Acts 16:15", home: "Acts 16:15", taught: "Acts 16:40", elders: "Philippians 1:1", left: "Acts 16:40", suffered: "Acts 16:22", time: "Acts 16:12" }],
  ["thessalonica",    { word: "Acts 17:3", believed: "Acts 17:4", spirit: "1 Thessalonians 1:5", home: "Acts 17:7", taught: "Acts 17:2", elders: "1 Thessalonians 5:12", left: "Acts 17:10", suffered: "1 Thessalonians 2:14", time: "Acts 17:2" }],
  ["berea",           { word: "Acts 17:10", believed: "Acts 17:12", taught: "Acts 17:11", left: "Acts 17:14", suffered: "Acts 17:13" }],
  ["athens",          { word: "Acts 17:17", believed: "Acts 17:34", left: "Acts 18:1" }],
  ["corinth",         { word: "Acts 18:5", believed: "Acts 18:8", baptized: "Acts 18:8", home: "Acts 18:7", taught: "Acts 18:11", elders: "1 Corinthians 16:15", left: "Acts 18:18", suffered: "Acts 18:12", time: "Acts 18:11" }],
  ["ephesus",         { word: "Acts 19:8", believed: "Acts 19:18", baptized: "Acts 19:5", spirit: "Acts 19:6", home: "Acts 20:20", taught: "Acts 19:9", elders: "Acts 20:17", left: "Acts 20:32", suffered: "Acts 20:19", time: "Acts 20:31" }],
  ["crete",           { taught: "Titus 2:1", elders: "Titus 1:5", left: "Titus 1:5" }]
];

// The life of a church, from the first preaching to maturity, in the order Acts shows it.
// [phrase, where the phrase is from, references]
const PLANTING = [
  ["They preached the gospel to that city", "Acts 14:21",
    ["Acts 8:5", "Acts 8:25", "Acts 13:44", "Acts 14:1", "Acts 14:7", "Acts 14:21", "Acts 16:13", "Acts 16:32", "Acts 17:2–3", "Acts 18:4–5", "Acts 19:8", "Romans 15:20", "1 Corinthians 2:1–2", "1 Corinthians 15:1", "1 Thessalonians 1:5", "1 Thessalonians 2:2"]],
  ["many of the Corinthians who heard the message believed and were baptized", "Acts 18:8",
    ["Acts 2:41", "Acts 8:12", "Acts 10:47–48", "Acts 13:48", "Acts 14:1", "Acts 16:14–15", "Acts 16:33–34", "Acts 17:4", "Acts 17:12", "Acts 17:34", "Acts 18:8", "Acts 19:5", "1 Thessalonians 1:9"]],
  ["the church that meets at their house", "Romans 16:5",
    ["Acts 2:46", "Acts 12:12", "Acts 16:15", "Acts 16:40", "Acts 17:5–7", "Acts 18:7", "Acts 20:20", "Romans 16:3–5", "Romans 16:23", "1 Corinthians 16:19", "Colossians 4:15", "Philemon 2"]],
  ["strengthening the souls of the disciples", "Acts 14:22",
    ["Acts 11:23", "Acts 11:26", "Acts 13:43", "Acts 14:22", "Acts 15:32", "Acts 15:41", "Acts 16:5", "Acts 18:11", "Acts 18:23", "Acts 20:1–2", "1 Thessalonians 3:2"]],
  ["Paul and Barnabas appointed elders for them in each church", "Acts 14:23",
    ["Acts 6:3", "Acts 14:23", "Acts 20:17", "Acts 20:28", "Philippians 1:1", "1 Thessalonians 5:12", "Titus 1:5"]],
  ["they entrusted them to the Lord, in whom they had believed", "Acts 14:23",
    ["Acts 13:51–52", "Acts 14:23", "Acts 16:40", "Acts 17:10", "Acts 17:14", "Acts 18:18", "Acts 20:1", "Acts 20:32", "Acts 20:36–38", "Acts 21:5–6"]],
  ["Let us go back and visit the brothers in every town", "Acts 15:36",
    ["Acts 14:21–22", "Acts 15:36", "Acts 15:41", "Acts 16:4–5", "Acts 18:23", "Acts 20:2", "1 Corinthians 4:17", "Philippians 2:19", "Colossians 4:7–8", "Colossians 4:16", "1 Thessalonians 3:1–2", "1 Thessalonians 3:6", "2 Thessalonians 2:15"]],
  ["set in order what was unfinished", "Titus 1:5",
    ["Acts 18:26", "Acts 19:1–6", "Romans 1:11", "1 Corinthians 11:34", "1 Thessalonians 3:10", "Titus 1:5"]],
  ["the message of the Lord ring out from you", "1 Thessalonians 1:8",
    ["Acts 8:4", "Acts 11:19–21", "Acts 13:2–3", "Acts 13:49", "Acts 16:5", "Acts 19:10", "Romans 1:8", "Colossians 1:6–7", "1 Thessalonians 1:7–8"]],
  ["as we mature to the full measure of the stature of Christ", "Ephesians 4:13",
    ["Ephesians 4:11–16", "Colossians 1:28", "Colossians 4:12", "Philippians 1:9–11", "Hebrews 6:1", "Romans 15:14"]]
];

// Marks of a healthy church, traced through the whole Bible.
// [phrase, where the phrase is from, references in canonical order]
const MARKS = [
  ["They devoted themselves to the apostles’ teaching", "Acts 2:42",
    ["Deuteronomy 31:12", "2 Chronicles 17:9", "Nehemiah 8:8", "Malachi 2:7", "Matthew 28:19–20", "Acts 2:42", "Acts 5:42", "Acts 11:26", "Acts 15:35", "Acts 18:11", "Acts 20:20", "Acts 20:27", "Colossians 1:28", "Colossians 3:16", "1 Timothy 4:13", "1 Timothy 5:17", "2 Timothy 2:2", "2 Timothy 4:2", "Titus 2:1"]],
  ["and to the fellowship", "Acts 2:42",
    ["Psalm 55:14", "Psalm 133:1", "Malachi 3:16", "Acts 2:42", "Acts 2:44", "Acts 4:32", "Romans 12:10", "Romans 15:7", "Galatians 6:2", "Ephesians 4:2–3", "Philippians 2:1–2", "Hebrews 3:13", "1 John 1:3", "1 John 1:7"]],
  ["to the breaking of bread", "Acts 2:42",
    ["Exodus 12:14", "Exodus 12:26–27", "Matthew 26:26–28", "Luke 22:19–20", "Acts 2:42", "Acts 2:46", "Acts 20:7", "1 Corinthians 10:16–17", "1 Corinthians 11:23–26"]],
  ["and to prayer", "Acts 2:42",
    ["1 Kings 8:28–30", "2 Chronicles 7:14", "Isaiah 56:7", "Matthew 18:19–20", "Matthew 21:13", "Acts 1:14", "Acts 2:42", "Acts 4:24", "Acts 4:31", "Acts 12:5", "Acts 12:12", "Acts 13:2–3", "Ephesians 6:18", "Colossians 4:2", "1 Timothy 2:1–2", "1 Timothy 2:8", "James 5:14–16"]],
  ["Repent and be baptized, every one of you", "Acts 2:38",
    ["Matthew 28:19", "Acts 2:38", "Acts 2:41", "Acts 8:12", "Acts 8:36, 38", "Acts 10:47–48", "Acts 16:15", "Acts 16:33", "Acts 18:8", "Acts 19:5", "Romans 6:3–4", "1 Corinthians 12:13", "Galatians 3:27", "Colossians 2:12", "1 Peter 3:21"]],
  ["Let us not neglect meeting together", "Hebrews 10:25",
    ["Leviticus 23:3", "Deuteronomy 16:16", "Psalm 122:1", "Acts 2:46", "Acts 20:7", "1 Corinthians 11:18", "1 Corinthians 14:23", "1 Corinthians 14:26", "1 Corinthians 16:2", "Hebrews 10:24–25", "James 2:2"]],
  ["Devote yourself to the public reading of Scripture", "1 Timothy 4:13",
    ["Exodus 24:7", "Deuteronomy 31:11", "Joshua 8:34–35", "Nehemiah 8:3", "Nehemiah 8:8", "Luke 4:16", "Acts 13:15", "Acts 15:21", "Acts 15:31", "Colossians 4:16", "1 Thessalonians 5:27", "1 Timothy 4:13", "Revelation 1:3"]],
  ["praising God", "Acts 2:47",
    ["Psalm 22:22", "Psalm 22:25", "Psalm 35:18", "Psalm 95:1–2", "Psalm 100:4", "Psalm 111:1", "Psalm 149:1", "Acts 2:47", "Acts 16:25", "1 Corinthians 14:26", "Ephesians 5:19", "Colossians 3:16", "Hebrews 13:15", "James 5:13", "Revelation 7:9–10"]],
  ["they shared with anyone who was in need", "Acts 2:45",
    ["Leviticus 19:9–10", "Deuteronomy 15:7–8", "Deuteronomy 15:11", "Proverbs 19:17", "Isaiah 58:7", "Acts 2:44–45", "Acts 4:34–35", "Acts 6:1–3", "Acts 11:29–30", "Romans 12:13", "Romans 15:26", "2 Corinthians 8:13–14", "2 Corinthians 9:7", "Galatians 2:10", "Galatians 6:10", "1 Timothy 5:3", "1 Timothy 5:16", "Hebrews 13:16", "James 1:27", "James 2:15–16", "1 John 3:17"]],
  ["Practice hospitality", "Romans 12:13",
    ["Genesis 18:2–5", "Job 31:32", "Acts 16:15", "Acts 21:8", "Acts 28:30", "Romans 12:13", "Romans 16:23", "1 Timothy 3:2", "Titus 1:8", "Hebrews 13:2", "1 Peter 4:9", "3 John 5–8"]],
  ["By this everyone will know that you are My disciples, if you love one another", "John 13:35",
    ["Leviticus 19:18", "John 13:34–35", "John 15:12", "Romans 12:10", "Romans 13:8", "Galatians 5:13", "Colossians 3:14", "1 Thessalonians 3:12", "1 Thessalonians 4:9–10", "Hebrews 13:1", "1 Peter 1:22", "1 Peter 4:8", "1 John 3:16–18", "1 John 4:7", "1 John 4:11–12"]],
  ["with diligence to preserve the unity of the Spirit", "Ephesians 4:3",
    ["Psalm 133:1", "Zephaniah 3:9", "John 17:20–23", "Acts 1:14", "Acts 2:46", "Acts 4:32", "Romans 15:5–6", "1 Corinthians 1:10", "1 Corinthians 12:13", "Ephesians 4:1–6", "Philippians 1:27", "Philippians 2:2", "Colossians 3:14–15"]],
  ["each of you should use whatever gift he has received to serve one another", "1 Peter 4:10",
    ["Exodus 31:3–6", "Exodus 35:10", "Numbers 11:29", "Joel 2:28–29", "Romans 12:4–8", "1 Corinthians 12:4–7", "1 Corinthians 12:12", "1 Corinthians 12:27", "1 Corinthians 14:26", "Ephesians 4:7", "Ephesians 4:11–12", "Ephesians 4:16", "1 Peter 4:10–11"]],
  ["appoint elders in every town", "Titus 1:5",
    ["Exodus 18:21", "Numbers 11:16–17", "Deuteronomy 1:13", "Jeremiah 3:15", "Ezekiel 34:2–4", "Acts 11:30", "Acts 14:23", "Acts 15:6", "Acts 20:17", "Acts 20:28", "Philippians 1:1", "1 Thessalonians 5:12–13", "1 Timothy 3:1–7", "1 Timothy 5:17", "Titus 1:5–9", "Hebrews 13:7", "Hebrews 13:17", "James 5:14", "1 Peter 5:1–4"]],
  ["select from among you seven men", "Acts 6:3",
    ["Acts 6:1–6", "Romans 16:1–2", "Philippians 1:1", "1 Timothy 3:8–13"]],
  ["They were all filled with the Holy Spirit", "Acts 4:31",
    ["Numbers 11:29", "Ezekiel 36:26–27", "Joel 2:28–29", "Zechariah 4:6", "Acts 2:4", "Acts 4:31", "Acts 9:31", "Acts 13:52", "1 Corinthians 12:7", "Galatians 5:22–25", "Ephesians 5:18"]],
  ["Be holy, because I am holy", "1 Peter 1:16",
    ["Leviticus 11:44", "Leviticus 19:2", "Acts 5:11", "2 Corinthians 6:16", "2 Corinthians 7:1", "Ephesians 5:3", "Ephesians 5:25–27", "1 Thessalonians 4:3", "1 Thessalonians 4:7", "Hebrews 12:14", "1 Peter 1:15–16", "1 Peter 2:9"]],
  ["restore him with a spirit of gentleness", "Galatians 6:1",
    ["Leviticus 19:17", "Proverbs 27:5–6", "Matthew 18:15–17", "Romans 15:14", "2 Corinthians 2:6–8", "Galatians 6:1", "2 Thessalonians 3:14–15", "1 Timothy 5:20", "Titus 3:10", "James 5:19–20", "Jude 22–23"]],
  ["Set apart for Me Barnabas and Saul", "Acts 13:2",
    ["Isaiah 6:8", "Isaiah 52:7", "Acts 8:14", "Acts 11:22", "Acts 13:2–3", "Acts 14:26", "Acts 15:22", "Acts 15:40", "Romans 10:14–15", "Romans 15:24", "Philippians 2:25", "3 John 6–8"]],
  ["your partnership in the gospel", "Philippians 1:5",
    ["Acts 11:29–30", "Romans 15:26–27", "1 Corinthians 16:1–3", "2 Corinthians 8:1–5", "2 Corinthians 9:2", "2 Corinthians 9:12–13", "Philippians 1:5", "Philippians 4:15–16", "Colossians 4:16", "3 John 8"]],
  ["And the Lord added to their number daily those who were being saved", "Acts 2:47",
    ["Acts 2:41", "Acts 2:47", "Acts 4:4", "Acts 5:14", "Acts 6:7", "Acts 9:31", "Acts 11:21", "Acts 11:24", "Acts 12:24", "Acts 16:5", "Acts 19:20", "Colossians 1:6", "1 Thessalonians 1:8", "2 Thessalonians 3:1"]],
  ["We must endure many hardships to enter the kingdom of God", "Acts 14:22",
    ["Psalm 34:19", "Acts 5:41", "Acts 8:1", "Acts 14:22", "Philippians 1:29–30", "1 Thessalonians 1:6", "1 Thessalonians 2:14", "1 Thessalonians 3:3–4", "2 Thessalonians 1:4", "Hebrews 10:32–34", "1 Peter 4:12–14", "Revelation 2:10", "Revelation 2:13"]]
];

// The church through the whole Bible, from the promise to Abraham to the bride of the Lamb.
// [phrase, where the phrase is from, references]
const STORY = [
  ["all the families of the earth will be blessed through you", "Genesis 12:3",
    ["Genesis 12:2–3", "Galatians 3:8", "Galatians 3:29"]],
  ["unto Me you shall be a kingdom of priests and a holy nation", "Exodus 19:6",
    ["Exodus 19:5–6", "Deuteronomy 7:6", "1 Peter 2:9–10", "Revelation 1:5–6", "Revelation 5:9–10"]],
  ["Gather the people before Me to hear My words", "Deuteronomy 4:10",
    ["Deuteronomy 4:10", "Deuteronomy 31:12", "Joshua 8:35", "Nehemiah 8:1–3", "Psalm 22:22", "Psalm 40:9–10", "Psalm 107:32", "Joel 2:15–16", "Acts 7:38", "Hebrews 2:12", "Hebrews 12:22–23"]],
  ["I will dwell among the Israelites and be their God", "Exodus 29:45",
    ["Exodus 25:8", "Exodus 29:45", "Leviticus 26:11–12", "Ezekiel 37:27", "1 Corinthians 3:16", "2 Corinthians 6:16", "Ephesians 2:19–22", "1 Peter 2:5", "Revelation 21:3"]],
  ["I will give you shepherds after My own heart", "Jeremiah 3:15",
    ["Numbers 27:16–17", "Jeremiah 3:15", "Jeremiah 23:4", "Ezekiel 34:23", "John 10:11", "John 10:16", "Acts 20:28", "1 Peter 5:2–4"]],
  ["My house will be called a house of prayer for all the nations", "Isaiah 56:7",
    ["Isaiah 2:2–3", "Isaiah 49:6", "Isaiah 56:6–7", "Amos 9:11–12", "Mark 11:17", "Acts 13:47", "Acts 15:14–17", "Revelation 7:9–10"]],
  ["I will put My Spirit within you", "Ezekiel 36:27",
    ["Numbers 11:29", "Jeremiah 31:33", "Ezekiel 36:26–27", "Joel 2:28–29", "Acts 2:16–18", "Acts 2:33"]],
  ["I will build My church", "Matthew 16:18",
    ["Matthew 16:18", "Matthew 18:17", "Matthew 18:20", "John 17:20–21", "Acts 20:28", "Ephesians 1:22–23", "Ephesians 3:10", "Ephesians 5:25–27", "Colossians 1:18", "1 Timothy 3:15"]],
  ["the bride, the wife of the Lamb", "Revelation 21:9",
    ["Isaiah 54:5", "Isaiah 62:5", "Hosea 2:19–20", "2 Corinthians 11:2", "Ephesians 5:31–32", "Revelation 19:7–8", "Revelation 21:2–3", "Revelation 21:9", "Revelation 22:17"]]
];

// Raising up leaders, and how the apostles left a church in their hands.
// [phrase, where the phrase is from, references]
const LEADERS = [
  ["Imitate me, just as I imitate Christ", "1 Corinthians 11:1",
    ["Acts 20:18", "Acts 20:34–35", "1 Corinthians 4:16–17", "1 Corinthians 11:1", "Philippians 3:17", "Philippians 4:9", "1 Thessalonians 1:6", "1 Thessalonians 2:7–12", "2 Thessalonians 3:7–9", "2 Timothy 3:10–11"]],
  ["Paul wanted Timothy to accompany him", "Acts 16:3",
    ["Exodus 24:13", "Numbers 11:28", "1 Kings 19:19–21", "Mark 3:14", "Acts 12:25", "Acts 13:5", "Acts 15:40", "Acts 16:3", "Acts 19:22", "Acts 20:4", "Philippians 2:19–22"]],
  ["An overseer, then, must be above reproach", "1 Timothy 3:2",
    ["Exodus 18:21", "Deuteronomy 1:13", "Acts 6:3", "1 Timothy 3:1–13", "Titus 1:6–9", "1 Peter 5:2–3"]],
  ["They must first be tested", "1 Timothy 3:10",
    ["Acts 16:2", "Philippians 2:22", "1 Timothy 3:6", "1 Timothy 3:10", "1 Timothy 5:22"]],
  ["appointed elders for them in each church, praying and fasting", "Acts 14:23",
    ["Numbers 27:18–23", "Deuteronomy 34:9", "Acts 6:6", "Acts 13:3", "Acts 14:23", "1 Timothy 4:14", "2 Timothy 1:6", "Titus 1:5"]],
  ["Be shepherds of the church of God", "Acts 20:28",
    ["Jeremiah 3:15", "Ezekiel 34:2–4", "John 21:15–17", "Acts 20:28–31", "1 Timothy 5:17", "Titus 1:9", "Hebrews 13:17", "James 5:14", "1 Peter 5:2–4"]],
  ["to equip the saints for works of ministry", "Ephesians 4:12",
    ["Exodus 18:20", "Ephesians 4:11–12", "2 Timothy 2:2", "2 Timothy 3:16–17", "Titus 2:3–4"]],
  ["hold them in highest regard because of their work", "1 Thessalonians 5:13",
    ["1 Corinthians 16:16", "Philippians 2:29", "1 Thessalonians 5:12–13", "1 Timothy 5:17–19", "Hebrews 13:7", "Hebrews 13:17"]],
  ["Now I commit you to God and to the word of His grace", "Acts 20:32",
    ["Deuteronomy 31:7–8", "1 Chronicles 28:20", "John 16:7", "Acts 14:23", "Acts 20:25", "Acts 20:29–32", "Acts 20:36–38", "2 Timothy 4:6–7", "2 Peter 1:13–15"]],
  ["entrust these to faithful men who will be qualified to teach others", "2 Timothy 2:2",
    ["Psalm 78:5–7", "Psalm 145:4", "Joel 1:3", "2 Timothy 1:13–14", "2 Timothy 2:1–2", "2 Timothy 3:14", "Titus 2:2–4"]],
  ["daily the pressure of my concern for all the churches", "2 Corinthians 11:28",
    ["Acts 15:36", "2 Corinthians 11:28", "Galatians 4:19", "Philippians 1:7–8", "Colossians 2:1", "Colossians 2:5", "1 Thessalonians 2:17", "1 Thessalonians 3:1–2", "1 Thessalonians 3:5", "1 Thessalonians 3:10", "3 John 4"]]
];

// Handing on the work, across the whole Bible: [who, references in the order of the story]
const HANDOFFS = [
  ["Moses to Joshua", ["Numbers 27:18–20", "Deuteronomy 31:7–8", "Deuteronomy 34:9"]],
  ["Joshua to the elders of Israel", ["Joshua 23:2", "Joshua 24:15", "Joshua 24:31", "Judges 2:10"]],
  ["Samuel to the people", ["1 Samuel 12:23"]],
  ["David to Solomon", ["1 Chronicles 28:9", "1 Chronicles 28:20"]],
  ["Elijah to Elisha", ["2 Kings 2:9–10", "2 Kings 2:15"]],
  ["Jesus to the Twelve", ["John 14:12", "John 16:7", "John 17:18", "John 17:20", "Matthew 28:18–20", "Acts 1:8"]],
  ["Paul to the elders of Ephesus", ["Acts 20:17–38"]],
  ["Paul to Timothy", ["2 Timothy 2:2", "2 Timothy 4:1–2", "2 Timothy 4:5–7"]],
  ["Peter to the churches", ["2 Peter 1:12–15"]]
];

// A mature church. [phrase, where the phrase is from, references]
const MATURITY = [
  ["so that we may present everyone perfect in Christ", "Colossians 1:28",
    ["1 Corinthians 14:20", "Ephesians 4:11–16", "Philippians 3:15", "Colossians 1:28", "Colossians 4:12", "Hebrews 5:14", "Hebrews 6:1", "James 1:4"]],
  ["you were not yet ready for solid food", "1 Corinthians 3:2",
    ["1 Corinthians 3:1–3", "Galatians 4:19", "Ephesians 4:14", "Hebrews 5:11–13"]],
  ["your faith is being proclaimed all over the world", "Romans 1:8",
    ["Romans 1:8", "Romans 16:19", "1 Corinthians 1:4–7", "2 Corinthians 8:1–5", "2 Corinthians 8:7", "Philippians 1:3–7", "Philippians 4:15–16", "Colossians 1:3–6", "Colossians 2:5", "1 Thessalonians 1:2–10", "1 Thessalonians 4:9–10", "2 Thessalonians 1:3–4", "Philemon 4–7", "Hebrews 6:10", "Hebrews 10:32–34", "3 John 3–6", "Revelation 2:2–3", "Revelation 2:9", "Revelation 2:13", "Revelation 2:19", "Revelation 3:4", "Revelation 3:8", "Revelation 3:10"]],
  ["able to instruct one another", "Romans 15:14",
    ["Romans 15:14", "Colossians 3:16", "1 Thessalonians 4:9", "1 Thessalonians 5:11", "Hebrews 3:13", "Hebrews 10:24–25", "1 John 2:27"]],
  ["the message of the Lord ring out from you", "1 Thessalonians 1:8",
    ["Acts 13:1–3", "Acts 19:10", "Romans 1:8", "Colossians 1:6–7", "Philippians 1:5", "Philippians 4:15–16", "1 Thessalonians 1:7–8", "3 John 7–8"]],
  ["But I have this against you", "Revelation 2:4",
    ["1 Corinthians 1:10–11", "1 Corinthians 3:3", "1 Corinthians 5:1–2", "1 Corinthians 11:17–18", "Galatians 1:6", "Galatians 3:1–3", "2 Thessalonians 3:11", "Hebrews 5:11–12", "James 2:1–4", "3 John 9–10", "Revelation 2:4–5", "Revelation 2:14", "Revelation 2:20", "Revelation 3:1–2", "Revelation 3:15–17"]],
  ["to present her to Himself as a glorious church", "Ephesians 5:27",
    ["Ephesians 5:25–27", "Colossians 1:22", "1 Thessalonians 3:12–13", "1 Thessalonians 5:23", "Jude 24", "Revelation 19:7–8"]]
];

// Sent, appointed, recognized: how churches came to be and were joined to the wider church.
// [heading, phrase, where the phrase is from, references]
const COMMISSION = [
  ["Workers were sent", "Set apart for Me Barnabas and Saul", "Acts 13:2",
    ["Acts 8:14", "Acts 11:22", "Acts 13:2–3", "Acts 15:22", "Acts 15:40", "Romans 10:15", "Colossians 1:7"]],
  ["Leaders were appointed", "Paul and Barnabas appointed elders for them in each church", "Acts 14:23",
    ["Acts 6:3", "Acts 6:6", "Acts 14:23", "1 Timothy 4:14", "Titus 1:5"]],
  ["Some churches began with no one sent", "Those who had been scattered preached the word wherever they went", "Acts 8:4",
    ["Matthew 18:20", "Acts 2:10", "Acts 8:4", "Acts 11:19–21"]],
  ["They were recognized and strengthened afterward", "When he arrived and saw the grace of God, he rejoiced", "Acts 11:23",
    ["Acts 8:14–17", "Acts 11:22–23", "Acts 18:26", "Acts 19:1–6", "Colossians 2:1", "Colossians 2:5"]]
];

// Timeline of each church. Years are approximate (AD), following a commonly used chronology;
// Scripture gives the order and the lengths of stay, not the years. Gallio's term in Corinth
// (Acts 18:12) is fixed by an inscription at AD 51–52, and the other years are counted from it.
// Event types: begin, stay, left, leaders, visit, letter, sent, trial, later.
// [year, type, what happened, reference, words quoted from that verse, end year (for a stay)]
const TIMELINE = {
  jerusalem: [
    [30, "begin", "Pentecost: about three thousand baptized", "Acts 2:41", "about three thousand were added"],
    [30, "stay", "The apostles stayed in Jerusalem", "Acts 8:1", "all except the apostles", 49],
    [31, "leaders", "The Seven chosen to serve", "Acts 6:3", "select from among you seven men"],
    [34, "trial", "Persecution scatters the church", "Acts 8:1", "a great persecution broke out against the church in Jerusalem"],
    [37, "visit", "Paul's first visit, three years after his conversion", "Galatians 1:18", "Only after three years"],
    [44, "trial", "Herod kills James and seizes Peter", "Acts 12:2", "put to death with the sword"],
    [45, "leaders", "Elders receive the famine relief", "Acts 11:30", "sending their gifts to the elders"],
    [49, "leaders", "Apostles and elders meet in council", "Acts 15:6", "the apostles and elders met"],
    [57, "visit", "Paul with James and all the elders", "Acts 21:18", "all the elders were present"]
  ],
  samaria: [
    [34, "begin", "Philip preaches; men and women baptized", "Acts 8:12", "they were baptized, both men and women"],
    [34, "visit", "Peter and John sent from Jerusalem", "Acts 8:14", "they sent Peter and John to them"],
    [34, "left", "Peter and John return to Jerusalem", "Acts 8:25", "they returned to Jerusalem"],
    [36, "later", "The church at peace and growing", "Acts 9:31", "It grew in strength and numbers"]
  ],
  damascus: [
    [34, "begin", "Disciples already in Damascus", "Acts 9:10", "In Damascus there was a disciple"],
    [34, "stay", "Saul with the disciples", "Acts 9:19", "he spent several days with the disciples in Damascus"],
    [34, "stay", "Arabia, then back to Damascus", "Galatians 1:17–18", "Only after three years", 37],
    [37, "left", "Saul let down over the wall", "Acts 9:25", "lowered him in a basket"]
  ],
  lydda: [
    [38, "visit", "Peter visits the saints in Lydda", "Acts 9:32", "he went to visit the saints in Lydda"],
    [38, "begin", "Many believe in Joppa", "Acts 9:42", "many people believed in the Lord"],
    [38, "stay", "Peter stays in Joppa", "Acts 9:43", "Peter stayed for several days in Joppa"]
  ],
  caesarea: [
    [40, "begin", "The Spirit falls; Gentiles baptized", "Acts 10:48", "he ordered that they be baptized"],
    [40, "stay", "Peter stays", "Acts 10:48", "stay for a few days"],
    [57, "later", "Paul stays with Philip the evangelist", "Acts 21:8", "stayed at the home of Philip the evangelist"]
  ],
  antioch: [
    [40, "begin", "Believers from Cyprus and Cyrene preach to Greeks", "Acts 11:21", "a great number of people believed"],
    [42, "visit", "Barnabas sent from Jerusalem", "Acts 11:22", "they sent Barnabas to Antioch"],
    [43, "stay", "Barnabas and Saul teach the church", "Acts 11:26", "for a full year", 44],
    [45, "sent", "Relief sent to Judea", "Acts 11:29", "decided to send relief"],
    [46, "leaders", "Prophets and teachers lead the church", "Acts 13:1", "there were prophets and teachers"],
    [47, "sent", "Barnabas and Saul sent out", "Acts 13:3", "sent them off"],
    [48, "stay", "Paul and Barnabas return", "Acts 14:28", "they spent a long time there", 49],
    [49, "visit", "The council's letter delivered", "Acts 15:30", "delivered the letter"],
    [50, "sent", "Paul and Silas sent out", "Acts 15:40", "commended by the brothers"],
    [52, "stay", "Paul returns", "Acts 18:23", "spent some time in Antioch"]
  ],
  "pisidian-antioch": [
    [47, "begin", "Gentiles believe", "Acts 13:48", "all who were appointed for eternal life believed"],
    [47, "stay", "Two Sabbaths", "Acts 13:44", "On the following Sabbath"],
    [47, "left", "Driven out", "Acts 13:50", "drove them out of their district"],
    [48, "leaders", "Elders appointed on the return trip", "Acts 14:23", "appointed elders for them in each church"],
    [50, "visit", "Paul and Silas pass through", "Acts 16:6", "the region of Phrygia and Galatia"],
    [53, "visit", "Paul strengthens the disciples", "Acts 18:23", "strengthening all the disciples"]
  ],
  iconium: [
    [47, "begin", "Jews and Greeks believe", "Acts 14:1", "a great number of Jews and Greeks believed"],
    [47, "stay", "A long stay", "Acts 14:3", "spent considerable time there"],
    [47, "left", "Fled from a plot to stone them", "Acts 14:6", "fled to the Lycaonian cities"],
    [48, "leaders", "Elders appointed on the return trip", "Acts 14:23", "appointed elders for them in each church"],
    [50, "visit", "The brothers commend Timothy", "Acts 16:2", "spoke well of him"],
    [53, "visit", "Paul strengthens the disciples", "Acts 18:23", "strengthening all the disciples"]
  ],
  lystra: [
    [47, "begin", "The gospel preached", "Acts 14:7", "they continued to preach the gospel"],
    [47, "trial", "Paul stoned", "Acts 14:19", "They stoned Paul"],
    [47, "left", "Paul leaves the next day", "Acts 14:20", "the next day he left with Barnabas"],
    [48, "leaders", "Elders appointed on the return trip", "Acts 14:23", "appointed elders for them in each church"],
    [50, "sent", "Timothy joins Paul", "Acts 16:3", "Paul wanted Timothy to accompany him"],
    [53, "visit", "Paul strengthens the disciples", "Acts 18:23", "strengthening all the disciples"]
  ],
  derbe: [
    [47, "begin", "Many disciples made", "Acts 14:21", "made many disciples"],
    [50, "visit", "Paul returns", "Acts 16:1", "Paul came to Derbe"],
    [57, "sent", "Gaius travels with Paul", "Acts 20:4", "Gaius from Derbe"]
  ],
  galatia: [
    [47, "begin", "Paul first preaches, because of an illness", "Galatians 4:13", "I first preached the gospel to you"],
    [48, "leaders", "Elders appointed on the return trip", "Acts 14:23", "appointed elders for them in each church"],
    [49, "letter", "Letter to the Galatians (some date it c. AD 55)", "Galatians 1:6", "how quickly you are deserting"],
    [53, "visit", "Paul strengthens the disciples", "Acts 18:23", "strengthening all the disciples"],
    [55, "sent", "Collection for Jerusalem", "1 Corinthians 16:1", "as I directed the churches of Galatia"]
  ],
  philippi: [
    [49, "begin", "Lydia and her household baptized", "Acts 16:15", "she and her household had been baptized"],
    [49, "stay", "Several days", "Acts 16:12", "we stayed there several days"],
    [49, "trial", "Paul and Silas beaten and jailed", "Acts 16:23", "they threw them into prison"],
    [49, "left", "They leave the city", "Acts 16:40", "Then they left the city"],
    [50, "sent", "Gifts sent to Paul in Thessalonica", "Philippians 4:16", "Thessalonica"],
    [56, "visit", "Paul passes through Macedonia", "Acts 20:2", "speaking many words of encouragement"],
    [57, "visit", "Paul sails from Philippi", "Acts 20:6", "we sailed from Philippi"],
    [61, "leaders", "Letter to the overseers and deacons", "Philippians 1:1", "together with the overseers and deacons"]
  ],
  thessalonica: [
    [50, "begin", "Jews and God-fearing Greeks persuaded", "Acts 17:4", "Some of the Jews were persuaded"],
    [50, "stay", "Three Sabbaths", "Acts 17:2", "on three Sabbaths"],
    [50, "left", "Sent away by night", "Acts 17:10", "the brothers sent Paul and Silas away"],
    [50, "visit", "Timothy sent back", "1 Thessalonians 3:2", "We sent Timothy"],
    [51, "leaders", "First letter names their leaders", "1 Thessalonians 5:12", "who preside over you in the Lord"],
    [51, "letter", "Second letter", "2 Thessalonians 1:3", "your faith is growing more and more"],
    [57, "sent", "Aristarchus and Secundus travel with Paul", "Acts 20:4", "Aristarchus and Secundus from Thessalonica"]
  ],
  berea: [
    [50, "begin", "Many believe", "Acts 17:12", "many of them believed"],
    [50, "left", "Paul sent to the coast", "Acts 17:14", "sent Paul to the coast"],
    [50, "stay", "Silas and Timothy stay on", "Acts 17:14", "Silas and Timothy remained in Berea"],
    [57, "sent", "Sopater travels with Paul", "Acts 20:4", "Sopater son of Pyrrhus from Berea"]
  ],
  athens: [
    [50, "begin", "Some believe", "Acts 17:34", "some joined him and believed"],
    [50, "left", "Paul leaves for Corinth", "Acts 18:1", "Paul left Athens"]
  ],
  corinth: [
    [50, "begin", "Many believe and are baptized", "Acts 18:8", "believed and were baptized"],
    [50, "stay", "A year and a half", "Acts 18:11", "a year and a half", 52],
    [51, "trial", "Brought before Gallio", "Acts 18:12", "brought him before the judgment seat"],
    [52, "left", "Paul says goodbye", "Acts 18:18", "saying goodbye to the brothers"],
    [52, "visit", "Apollos comes", "Acts 18:27", "he was a great help"],
    [55, "leaders", "First letter: submit to Stephanas's household", "1 Corinthians 16:15–16", "submit to such as these"],
    [55, "visit", "Timothy sent", "1 Corinthians 4:17", "I have sent you Timothy"],
    [56, "letter", "Second letter, after Titus's report", "2 Corinthians 7:6", "by the arrival of Titus"],
    [57, "stay", "Three months in Greece", "Acts 20:3", "he stayed three months"]
  ],
  ephesus: [
    [52, "begin", "Paul reasons in the synagogue", "Acts 18:19", "reasoned with the Jews"],
    [52, "left", "Paul leaves, promising to return", "Acts 18:21", "I will come back to you if God is willing"],
    [52, "visit", "Priscilla and Aquila teach Apollos", "Acts 18:26", "explained to him the way of God more accurately"],
    [53, "visit", "Paul returns; twelve disciples baptized", "Acts 19:5", "baptized into the name of the Lord Jesus"],
    [53, "stay", "Three months in the synagogue", "Acts 19:8", "for three months"],
    [53, "stay", "Two years in the hall of Tyrannus", "Acts 19:10", "This continued for two years", 55],
    [55, "left", "Paul leaves for Macedonia", "Acts 20:1", "left for Macedonia"],
    [57, "leaders", "Paul meets the elders at Miletus", "Acts 20:17", "the elders of the church"],
    [57, "left", "His last farewell to them", "Acts 20:25", "will see my face again"],
    [61, "letter", "Letter to the Ephesians", "Ephesians 1:15", "ever since I heard about your faith"],
    [63, "visit", "Timothy left in Ephesus", "1 Timothy 1:3", "stay on at Ephesus"],
    [95, "later", "The Lord's word to Ephesus", "Revelation 2:4", "You have abandoned your first love"]
  ],
  troas: [
    [55, "begin", "A door opened for the gospel", "2 Corinthians 2:12", "a door stood open for me"],
    [57, "stay", "Seven days", "Acts 20:6", "where we stayed seven days"],
    [57, "left", "Paul leaves at daybreak", "Acts 20:11", "after speaking until daybreak, he departed"]
  ],
  colossae: [
    [54, "begin", "Epaphras brings the gospel (likely during Paul's years in Ephesus)", "Colossians 1:7", "You learned it from Epaphras"],
    [60, "letter", "Letter to the Colossians", "Colossians 2:5", "your orderly condition and firm faith"],
    [60, "visit", "Tychicus sent", "Colossians 4:8", "I have sent him to you"],
    [60, "leaders", "Archippus charged with his ministry", "Colossians 4:17", "complete the ministry you have received"]
  ],
  laodicea: [
    [54, "begin", "Epaphras labors for them", "Colossians 4:13", "for those at Laodicea and Hierapolis"],
    [60, "letter", "Letters exchanged with Colossae", "Colossians 4:16", "read in the church of the Laodiceans"],
    [95, "later", "The Lord's word to Laodicea", "Revelation 3:15", "you are neither cold nor hot"]
  ],
  rome: [
    [30, "begin", "Visitors from Rome at Pentecost", "Acts 2:10", "visitors from Rome"],
    [57, "letter", "Letter to the Romans", "Romans 1:8", "your faith is being proclaimed all over the world"],
    [60, "visit", "The brothers meet Paul on the road", "Acts 28:15", "traveled as far as the Forum of Appius"],
    [60, "stay", "Two years in his rented house", "Acts 28:30", "two full years", 62]
  ],
  crete: [
    [30, "begin", "Cretans at Pentecost", "Acts 2:11", "Cretans"],
    [63, "stay", "Titus left in Crete", "Titus 1:5", "The reason I left you in Crete"],
    [63, "leaders", "Elders to be appointed in every town", "Titus 1:5", "appoint elders in every town"]
  ],
  coast: [
    [57, "stay", "Seven days with the disciples in Tyre", "Acts 21:4", "stayed with them seven days"],
    [57, "stay", "A day in Ptolemais", "Acts 21:7", "stayed with them for a day"],
    [59, "visit", "Friends in Sidon care for Paul", "Acts 27:3", "visit his friends"],
    [60, "stay", "A week in Puteoli", "Acts 28:14", "spend the week with them"]
  ],
  dispersion: [
    [63, "leaders", "Peter writes to their elders", "1 Peter 5:1", "I appeal to the elders among you"]
  ],
  hebrews: [
    [65, "leaders", "Remember and obey your leaders", "Hebrews 13:7", "Remember your leaders"],
    [65, "later", "Looking back to their early days", "Hebrews 10:32", "Remember the early days"]
  ],
  james: [
    [48, "leaders", "Call the elders of the church", "James 5:14", "call the elders of the church"]
  ],
  john: [
    [90, "letter", "Second letter", "2 John 4", "walking in the truth"],
    [90, "letter", "Third letter: Diotrephes", "3 John 9", "Diotrephes, who loves to be first"]
  ],
  smyrna: [
    [54, "begin", "All Asia hears the word (likely when it began)", "Acts 19:10", "everyone who lived in the province of Asia"],
    [95, "later", "The Lord's word to Smyrna", "Revelation 2:10", "Be faithful even unto death"]
  ],
  pergamum: [
    [54, "begin", "All Asia hears the word (likely when it began)", "Acts 19:10", "everyone who lived in the province of Asia"],
    [95, "later", "The Lord's word to Pergamum", "Revelation 2:13", "you have held fast to My name"]
  ],
  thyatira: [
    [49, "visit", "Lydia of Thyatira believes, in Philippi", "Acts 16:14", "from the city of Thyatira"],
    [54, "begin", "All Asia hears the word (likely when it began)", "Acts 19:10", "everyone who lived in the province of Asia"],
    [95, "later", "The Lord's word to Thyatira", "Revelation 2:19", "your latter deeds are greater than your first"]
  ],
  sardis: [
    [54, "begin", "All Asia hears the word (likely when it began)", "Acts 19:10", "everyone who lived in the province of Asia"],
    [95, "later", "The Lord's word to Sardis", "Revelation 3:1", "you have a reputation for being alive"]
  ],
  philadelphia: [
    [54, "begin", "All Asia hears the word (likely when it began)", "Acts 19:10", "everyone who lived in the province of Asia"],
    [95, "later", "The Lord's word to Philadelphia", "Revelation 3:8", "you have kept My word"]
  ]
};

// Names for the event types, in the order of the legend.
const EVENT_TYPES = [
  ["begin", "Began"], ["stay", "Stayed"], ["left", "Left"], ["leaders", "Leaders"], ["visit", "Visited or strengthened"],
  ["letter", "Letter"], ["sent", "Sent out or gave"], ["trial", "Suffering"], ["later", "Later word"]
];

// The six core elements: a summary of the patterns across every list in this app.
// Each element names the marks, planting stages and pages that belong to it, and the
// start-grid elements that measure it. The summary line is a plain description, not Scripture.
// [name, phrase, where the phrase is from, summary, key references, pages that belong to it, START elements]
const CORE = [
  ["The word", "They devoted themselves to the apostles’ teaching", "Acts 2:42",
    "Every church began with the word preached, and kept being taught and strengthened by it.",
    ["Deuteronomy 31:12", "Nehemiah 8:8", "Acts 2:42", "Acts 14:21–22", "Acts 18:11", "Acts 20:20", "Colossians 3:16", "2 Timothy 4:2"],
    ["mark-0", "mark-6", "stage-0", "stage-3"], ["word", "taught"]],
  ["Faith and baptism", "many of the Corinthians who heard the message believed and were baptized", "Acts 18:8",
    "People turned to God, believed, and were baptized into the body.",
    ["Genesis 15:6", "Acts 2:38", "Acts 2:41", "Acts 8:12", "Acts 16:33–34", "Acts 18:8", "Romans 6:3–4", "1 Thessalonians 1:9"],
    ["mark-4", "stage-1"], ["believed", "baptized"]],
  ["Gathered as a family", "All the believers were together and had everything in common", "Acts 2:44",
    "They met together, often in homes, for fellowship, the breaking of bread, prayer and praise, and loved one another in deed.",
    ["Psalm 133:1", "Acts 2:44–46", "Acts 20:7", "Romans 12:13", "Romans 16:5", "Hebrews 10:24–25", "1 John 1:7"],
    ["mark-1", "mark-2", "mark-3", "mark-5", "mark-7", "mark-8", "mark-9", "mark-10", "mark-11", "mark-17", "stage-2"], ["home"]],
  ["Shepherds from within", "Paul and Barnabas appointed elders for them in each church", "Acts 14:23",
    "Leaders were raised from among the believers, tested, appointed, and entrusted to train others.",
    ["Exodus 18:21", "Jeremiah 3:15", "Acts 14:23", "Acts 20:28", "1 Timothy 3:2", "Titus 1:5", "2 Timothy 2:2", "1 Peter 5:2–3"],
    ["mark-12", "mark-13", "mark-14", "stage-4", "stage-5", "stage-7", "stage-9", "leaders", "handoffs"], ["elders", "left"]],
  ["Connected and sent", "your partnership in the gospel", "Philippians 1:5",
    "No church stood alone: they were visited, written to and helped, and they sent workers out in turn.",
    ["Isaiah 6:8", "Acts 13:2–3", "Acts 15:36", "Romans 15:26", "Philippians 1:5", "Colossians 4:16", "1 Thessalonians 1:8", "3 John 8"],
    ["mark-18", "mark-19", "mark-20", "stage-6", "stage-8", "commission", "timeline"], []],
  ["The Spirit and endurance", "the disciples were filled with joy and with the Holy Spirit", "Acts 13:52",
    "The Holy Spirit gave life, power and holiness, and the churches held on through hardship.",
    ["Joel 2:28–29", "Zechariah 4:6", "Acts 2:4", "Acts 4:31", "Acts 13:52", "Acts 14:22", "1 Thessalonians 1:6", "1 Peter 4:14"],
    ["mark-15", "mark-16", "mark-21"], ["spirit", "suffered"]]
];
// Which elements Scripture shows at a church's start, and which came as it grew (indexes into CORE).
const CORE_PHASES = [
  ["At the start", "the word preached, people believing, gathered with the Spirit among them", [0, 1, 2, 5]],
  ["As it grows", "leaders appointed from within, follow-up visits and letters, partnership with other churches", [3, 4]],
  ["When mature", "all six carried by the church itself", [0, 1, 2, 3, 4, 5]]
];
