import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const dbPath = "./data/urls.json";

function loadDB() {
    if (!fs.existsSync(dbPath)) return {};
    return JSON.parse(fs.readFileSync(dbPath));
}

function saveDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function genCode() {
    return Math.random().toString(36).substring(2, 8);
}

app.use(express.static("public"));

app.post("/api/shorten", (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    const db = loadDB();
    const code = genCode();

    db[code] = url;
    saveDB(db);

    res.json({ code });
});

app.get("/api/shorten", (req, res) => {
    const db = loadDB();
    res.json(db);
});

app.delete("/api/shorten", (req, res) => {
    const { code } = req.body;
    const db = loadDB();

    delete db[code];
    saveDB(db);

    res.json({ ok: true });
});

app.get("/s/:code", (req, res) => {
    const code = req.params.code;
    const db = loadDB();
    if (!db[code]) return res.status(404).send("URL not found");
    res.redirect(db[code]);
});

app.listen(3000, () =>
    console.log("Server running at http://localhost:3000")
);