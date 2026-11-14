
class RouteService {
    constructor(routeRepository, cameraRepository) {
        this.routeRepository = routeRepository;
        this.cameraRepository = cameraRepository;
    }

    rankRoutes() {
        const routes = this.routeRepository.getAllRoutes();

        if(routes.length === 0) {
            return { error: "Routes not found", status: 404 };
        }

        const rankedRoutes = routes.map(route => {
            const cameras = this.cameraRepository.findByRoute(route.road);

            return {
                id: route.id,
                name: route.name,
                minutes: route.minutes,
                road: route.road,
                cameraCount: cameras.length
            };
        });

       //Fewest cameras first. Ties go to shorter drive time
        rankedRoutes.sort((a,b) => {
            if(a.cameraCount !== b.cameraCount) {
                return a.cameraCount - b.cameraCount;
            }
            return a.minutes - b.minutes;
        });

        rankedRoutes.forEach((route,index) => {
            route.recommended = index === 0;
        });
            
        return {
            status: 200,
            routes: rankedRoutes
        };
    }
}

module.exports = RouteService;

