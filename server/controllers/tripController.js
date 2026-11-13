const express = require("express");

function createTripController(tripService) {
  const router = express.Router();

  router.get("/", (req, res) => {
    const result = cameraService.saveTrip(req.body.destination);
  
    if (result.error) {
      return res.status(result.status).json({ error: result.error })
    }
    res.json(result.trip);
    });

  router.get("/recent", (req, res) => {
    const result = tripService.getRecentTrips();

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json(result.trips);
  });

  return router;
}

module.exports = createTripController;
