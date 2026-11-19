const express = require("express");


function createCameraController(cameraService) {
  const router = express.Router();


    function getCamerasInArea(req, res) {

      const { north, south, east, west } = req.query;
      const result = cameraService.getCamerasInArea(north, south, east, west);

      if (result.error) {
        return res.status(result.status).json({error: result.error});
    }

    res.json({count: result.count, cameras: result.cameras, message: result.message});
  }

    router.get("/", getCamerasInArea);

  function getCamera(req, res) {

    const result = cameraService.getCameraDetails(req.params.id);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json(result.camera);
  }

  router.get("/:id", getCamera);

  return router;
}

module.exports = createCameraController;
