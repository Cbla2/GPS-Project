class RouteRepository {
    constructor(db) {
        this.db = db;
    }

    getAllRoutes() {
        return this.db.prepare("SELECT * FROM routes").all();
    }

    findById(id) {
        return this.db.prepare("SELECT * FROM routes WHERE id = ?").get(id);
    }
}

module.exports = RouteRepository;
