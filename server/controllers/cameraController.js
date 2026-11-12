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

  router.get("/:id", (req, res) => {
    const result = cameraService.getCameraDetails(req.params.id);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json(result.camera);
  });

  return router;
}

module.exports = createCameraController;
