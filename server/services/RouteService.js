
class RouteService {
    constructor(routeRepository, cameraRepository) {
        this.routeRepository = routeRepository;
        this.cameraRepository = cameraRepository;
    }

    rankRoutes() {
        const routes = this.routeRepository.findAll();

        if(routes.length === 0) {
            return { error: "Routes not found", status: 404 };
        }

        const rankedRoutes = routes.map(route => {
            const cameras = this.cameraRepository.findByRoute(route.name);

            return {
                id: route.id,
                name: route.name,
                minutes: route.minutes,
                road: route.road,
                cameraCount: cameras.length
            };
        });

        const fewest = Math.min(...rankedRoutes.map(route => route.cameraCount));

        rankedRoutes.forEach(route => {
            route.recommended = route.cameraCount === fewest;
        });

        rankedRoutes.sort((a, b) => {
            if(a.recommended !== b.recommended) {
                return a.recommended ? -1 : 1;
            }
            return a.minutes - b.minutes;
        });

        return {
            status: 200,
            routes: rankedRoutes
        };
    }
}

module.exports = RouteService;
