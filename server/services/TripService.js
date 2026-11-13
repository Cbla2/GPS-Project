class CameraService {
    constructor(tripRepository) {
        this.trip[Repository = tripRepository;
    }


    saveTrip(destination) {
      if (typeof destination !== "string") {
        return { error: "Destination is required", status: 400 };
      }
      destination = destination.trim();
      
      if (destination === "") {
        return { error: "Destination is required", status: 400 };
      }

      if(destination.length > 400) {
        return { error: "Destination is too long", status: 400 };
      }
      const trip = this.tripRepository.save(destination);
      this.tripRepository.deleteOlderThan(5);
      return {
        status: 200,
        trip: {
          id: trip.id,
          destination: trip.destination,
          createdAt: trip.created_at
        }
      };
    }

    getRecentTrips() {
      const trips = this.tripRepository.findRecent(5);
      return {
        status: 200,
        trips: trips.map(trip => ({
          id: trip.id,
          destination: trip.destination,
          createdAt: trip.created_at
        }))
      };
    }
}
        

  module.exports= TripService;
  
    if(require.main === module) {
        const db = require("../db/database");
        const CameraRepository = require("../repositories/TripRepository");
        const service = new TripService(new TripRepository(db));

        console.log(service.saveTrip(""));
        console.log(service.saveTrip("somewhere"));
        console.log(service.getRecentTrips());
    }
