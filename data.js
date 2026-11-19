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
