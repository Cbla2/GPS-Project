
function toCompass(direction) {
  if (!direction) return "Unknown";
  const degrees = parseFloat(direction);
  if (Number.isNaN(degrees)) return direction;   // already text, like "N"
  const names = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];
  const index = Math.round((((degrees % 360) + 360) % 360) / 45) % 8;
  return `${names[index]} (${degrees}°)`;
}

const MAX_SPAN = 1.0;
const MAX_MARKERS = 2000;

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
                title: camera.manufacturer ? `${camera.manufacturer} ALPR camera` : "ALPR camera",
                operator: camera.operator || "Unknown operator",
                location: `${camera.latitude.toFixed(5)}, ${camera.longitude.toFixed(5)}`,
                facing: toCompass(camera.direction),
                source: camera.source
                }
            };
        }

        getCamerasInArea(north, south, east, west) {
            const n = Number(north), s = Number(south), e = Number(east), w = Number(west);

            if ([n, s, e, w].some(value => Number.isNaN(value))) {
      return { error: "Map area is required", status: 400 };
    }

    if (n <= s || e <= w) {
      return { error: "Invalid map area", status: 400 };
    }

    const count = this.cameraRepository.countInArea(n, s, e, w);


    if (n - s > MAX_SPAN || e - w > MAX_SPAN) {
      return { status: 200, count, cameras: [], message: "Zoom in to see cameras" };
    }

    const cameras = this.cameraRepository.findInArea(n, s, e, w, MAX_MARKERS);
    return { status: 200, count, cameras, message: `${count} cameras in view` };
  }
    
        
        
    getCameraCounts(route) {
        const mapTotal  = this.cameraRepository.countAll();
        const routeTotal = route ? this.cameraRepository.countByRoute(route) : null;            
        return {
                status: 200,
                counts: {
                    mapTotal,
                    route,
                    routeTotal,
                    countLabel: routeTotal != null ? `${routeTotal} cameras on ${route}` : `${mapTotal} cameras on map`
                }
            }
             
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
