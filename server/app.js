const express = require("express");
const path = require("path");

const db = require("./db/database");
//Camera apps
const CameraRepository = require("./repositories/CameraRepository");
const CameraService = require("./services/CameraService");
const createCameraController = require("./controllers/cameraController");
//Trip apps
const TripRepository = require("./repositories/TripRepository");
const TripService = require("./services/TripService");
const createTripController = require("./controllers/tripController");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "Flock")));


const cameraRepository = new CameraRepository(db);
const cameraService = new CameraService(cameraRepository);
app.use("/api/cameras", createCameraController(cameraService));

const tripRepository = new TripRepository(db);
const tripService = new TripService(tripRepository);
app.use("/api/trips", createTripController(tripService));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Flocker running at http://localhost:${PORT}`);
}
);
