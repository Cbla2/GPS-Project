
const Database = require("better-sqlite3");
const path = require("path");

//Opens the database file inside server
const db = new Database(path.join(__dirname, "flocker.db"));

//If camera tables do no exist, create them.
db.exec(`
    CREATE TABLE IF NOT EXISTS cameras (
        id  INTEGER PRIMARY KEY,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        operator TEXT,
        direction TEXT,
        manufacturer TEXT,
        source TEXT NOT NULL DEFAULT 'OpenStreetMap'
        )
    `);

//Look cameras up by location.
db.exec(`
    CREATE INDEX IF NOT EXISTS idx_cameras_location ON cameras (latitude, longitude)
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS trips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    destination TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
    
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS routes (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    minutes INTEGER NOT NULL,
    road TEXT NOT NULL
    )
`);

const routeCount = db.prepare("SELECT COUNT(*) AS n FROM routes").get().n;

if (routeCount === 0) {
    const insertRoute = db.prepare("INSERT INTO routes (id, name, minutes, road) VALUES (?, ?, ?, ?)");
    insertRoute.run(1, "Route 28", 18, "Route 28");
    insertRoute.run(2, "Fairfax County Pkwy", 24, "Fairfax County Pkwy");
    insertRoute.run(3, "Route 50", 27, "Route 50");
}


    module.exports = db;
    

    //For testing. Will only run when you run this file.
    if (require.main === module) {
        console.log("Cameras in database:", db.prepare("SELECT COUNT(*) AS n FROM cameras").get().n);
        console.log("Routes in database:", db.prepare("SELECT COUNT(*) AS n FROM routes").get().n);
    }
