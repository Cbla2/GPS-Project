class CameraService {
    constructor(cameraRepository) {
        this.cameraRepository = cameraRepository;
    }


    getCameraDetails(id) {
        const cameraId = Number(id);

        if(!Number.isInteger(cameraId) || cameraId <= 0) {
            return { error: "Invalid camera ID", status: 400 };
            }

            const camera = this.cameraRepository.findById(cameraId);

            if(!camera) {
                return { error: "Camera not found", status: 404 };
            }

            return {
                status: 200,
                camera: {
                    id: camera.id,
                    title: camera.title,
                    operator: camera.operator,
                    location: camera.location,
                    facing: camera.facing,
                    source: camera.source,
                    onRoute: camera.route !== null,
                    routeLabel: camera.route ? `On ${camera.route}` : "Not on a tracked route"
                }
            };
        }
    }

    module.exports = CameraService;

    if(require.main === module) {
        const db = require("../db/database");
        const CameraRepository = require("../repositories/CameraRepository");
        const service = new CameraService(new CameraRepository(db));

        console.log(service.getCameraDetails(2));
        console.log(service.getCameraDetails(99));
        console.log(service.getCameraDetails("abc"));
    }
