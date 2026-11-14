const Database = require("better-sqlite3");
const path = require("path");

//Opens the database file inside server
const db = new Database(path.join(__dirname, "flocker.db"));

//If camera tables do no exist, create them.
db.exec(`
    CREATE TABLE IF NOT EXISTS cameras (
        id  INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        operator TEXT NOT NULL,
        location TEXT NOT NULL,
        facing TEXT NOT NULL,
        source TEXT NOT NULL,
        route TEXT,
        map_left REAL NOT NULL,
        map_top REAL NOT NULL
        )
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

    //Sample cameras. 
    const count = db.prepare("SELECT COUNT(*) AS n FROM cameras").get().n;

    if (count === 0) {
        const insert = db.prepare(`
            INSERT INTO cameras (id, title, operator, location, facing, source, route, map_left, map_top)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);


            insert.run(1, "Camera 1 · Route 28", "County police", "Route 28 northbound, near Sterling", "South (reads oncoming plates)", "OpenStreetMap", "Route 28", 49.5, 84);
            insert.run(2, "Camera 2 · Route 28", "County police", "Route 28 northbound, mid-route", "South (reads oncoming plates)", "OpenStreetMap", "Route 28", 46, 60);
            insert.run(3, "Camera 3 · Route 28", "County police", "Route 28 southbound, mid-route", "North (reads oncoming plates)", "OpenStreetMap", "Route 28", 46.5, 36);
            insert.run(4, "Camera 4 · Route 28", "City police", "Route 28 southbound, near Fairfax", "North (reads oncoming plates)", "OpenStreetMap", "Route 28", 52, 12);
            insert.run(5, "Camera 5", "Homeowners association", "Neighborhood entrance, west of Route 28", "East", "OpenStreetMap", null, 20, 45);
            insert.run(6, "Camera 6", "Shopping center", "Parking lot entrance, east of Route 28", "West", "OpenStreetMap", null, 82, 25);
            insert.run(7, "Camera 7", "County police", "Side road near the park", "North", "OpenStreetMap", null, 82, 78);
    }

    module.exports = db;

    //For testing. Will only run when you run this file.
    if (require.main === module) {
        console.log("Cameras in database:", db.prepare("SELECT COUNT(*) AS n FROM cameras").get().n);
    }
