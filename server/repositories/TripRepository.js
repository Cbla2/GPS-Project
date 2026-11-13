class TripRepository {
    constructor(db) {
        this.db = db;
    }


save(destination) {
  const result = this.db.prepare("INSERT INTO trips (destination) VALUES (?)").run(destination);
  return this.findById(result.lastInsertRowid);
}

findById(id) {
  return this.db.prepare("SELECT * FROM trips WHERE id = ?").get(id);
}

findRecent(limit) {
  return this.db.prepare("SELECT * FROM trips ORDER BY id DESC LIMIT ?").all(limit);
}

//System to only save x number most recent trips
deleteOlderThan(limit) {
  this.db.prepare("DELETE FROM trips WHERE id NOT IN (SELECT id FROM trips ORDER BY id DESC LIMIT ?)").run(limit);
}
}
  

module.exports = TripRepository;
