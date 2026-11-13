class AlertService {

    constructor(cameraRepository) {
        this.cameraRepository = cameraRepository;
    }

    nextCameraAhead(route, position) {

        
        position = Number(position);

        
        if (!route || isNaN(position) || position < 0 || position > 100) {
            return {
                status: 400,
                error: "Invalid route or position"
            };
        }

        
        const cameras = this.cameraRepository.findByRoute(route);

        
        const routeMiles = 5;

        
        let nextCamera = null;
        let closestDistance = 100;

        
        for (let camera of cameras) {

            
            let cameraPosition = 100 - camera.map_top;

            
            let distance = cameraPosition - position;

            
            if (distance > 0) {

                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    nextCamera = camera;
                }
            }
        }

        
        if (nextCamera === null) {
            return {
                status: 200,
                message: "No cameras ahead",
                camera: null,
                distanceMiles: null
            };
        }

        
        let distanceMiles = (closestDistance / 100) * routeMiles;

        
        distanceMiles = Number(distanceMiles.toFixed(2));

        
        return {
            status: 200,
            message: "Camera ahead in " + distanceMiles + " mi",
            distanceMiles: distanceMiles,
            camera: {
                id: nextCamera.id,
                title: nextCamera.title
            }
        };
    }
}

module.exports = AlertService;
