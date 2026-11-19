const { Route } = require("express");

class CameraRepository {
    constructor(db) {
        this.db = db;
    }


findById(id) {
    return this.db.prepare("SELECT * FROM cameras WHERE id = ?").get(id);
}

findInArea(north, south, east, west, limit) {
    return this.db.prepare(`
      SELECT id, latitude, longitude FROM cameras
      WHERE latitude BETWEEN ? AND ?
        AND longitude BETWEEN ? AND ?
      LIMIT ?
    `).all(south, north, west, east, limit);
}

countInArea(north, south, east, west) {
    return this.db.prepare(`
      SELECT COUNT(*) AS n FROM cameras
      WHERE latitude BETWEEN ? AND ?
        AND longitude BETWEEN ? AND ?
    `).get(south, north, west, east).n;
}

findAll() {
    return this.db.prepare("SELECT * FROM cameras").all();
}

findByRoute(route) {
    return this.db.prepare("SELECT * FROM cameras WHERE route = ?").all(route);
}

countAll() {
    return this.db.prepare("SELECT COUNT(*) AS n FROM cameras").get().n;
}

countByRoute(route) {
    return this.db.prepare("SELECT COUNT(*) AS n FROM cameras WHERE route = ?").get(route).n;
}
}

module.exports = CameraRepository;
