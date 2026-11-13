const express = require("express");

function createRouteController(routeService) {
  const router = express.Router();

  router.get("/", (req, res) => {
    const result = routeService.rankRoutes();

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json(result.routes);
  });

  return router;
}

module.exports = createRouteController;
