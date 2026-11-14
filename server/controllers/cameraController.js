const express = require("express");

function createCameraController(cameraService) {
  const router = express.Router();

  router.get("/count", (req, res) => {
    const result = cameraService.getCameraCounts(req.query.route);
  
    if (result.error) {
      return res.status(result.status).json({ error: result.error })
    }
    res.json(result.counts);
    });

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
