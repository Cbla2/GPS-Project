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
}

module.exports = CameraRepository;
