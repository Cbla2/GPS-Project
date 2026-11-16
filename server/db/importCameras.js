const fs = require("fs");
const path = require("path");
const db = require("./database");

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "alpr.json"), "utf8"));

const insert = db.prepare(`
    INSERT OR REPLACE INTO cameras (id, latitude, longitude, operator, direction, manufacturer)
    VALUES(?, ?, ?, ?, ?, ?)
    `);

    const importAll = db.transaction((elements) => {
    for (const el of elements) {
        if (el.type !== "node") continue;
        const tags = el.tags || {};
        insert.run(
            el.id,
            el.lat,
            el.lon,
            tags.operator || null,
            tags["camera:direction"] || tags.direction || null,
            tags.manufacturer || tags.brand || null
        );
    }
});

importAll(data.elements);

const total = db.prepare("SELECT COUNT(*) AS n FROM cameras").get().n;
console.log(`Cameras in database: ${total}`);