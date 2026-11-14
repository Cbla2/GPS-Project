const express = require("express");

function createAlertController(alertService) {

    const router = express.Router();

    router.get("/next", function(req, res) {

        
        let route = req.query.route;

        
        let position = req.query.position;

        
        let result = alertService.nextCameraAhead(route, position);

        
        if (result.error) {
            res.status(result.status).json(result);
            return;
        }

        
        res.json(result);

    });

    return router;
}

module.exports = createAlertController;
