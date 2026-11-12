const { Route } = require("express");

class CameraRepository {
    constructor(db) {
        this.db = db;
    }


findById(id) {
    return this.db.prepare("SELECT * FROM cameras WHERE id = ?").get(id);
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
