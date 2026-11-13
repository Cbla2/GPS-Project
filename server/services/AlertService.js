class AlertService {
    constructor(cameraRepository) {
        this.cameraRepository = cameraRepository;
    }

    nextCameraAhead(route, position) {
        
        const cameras = this.cameraRepository.findByRoute(route);

        
        return cameras;
    }
}

module.exports = AlertService;
