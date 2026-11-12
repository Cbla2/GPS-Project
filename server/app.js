const express = require("express");
const path = require("path");

const db = require("./db/database");
const CameraRepository = require("./repositories/CameraRepository");
const CameraService = require("./services/CameraService");
const createCameraController = require("./controllers/cameraController");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "Flock")));


const cameraRepository = new CameraRepository(db);
const cameraService = new CameraService(cameraRepository);
app.use("/api/cameras", createCameraController(cameraService));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Flocker running at http://localhost:${PORT}`);
}
);