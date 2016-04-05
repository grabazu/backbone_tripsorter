define([
	'backbone', 
	'models/city',
	'models/trip'
], function(
	Backbone, 
	City,
	Trip
){
	
	var CityList = Backbone.Collection.extend({ 
		
		getByName : function(name){
			return this.find(function(model) {
				return model.getName() === name ;
			});
		},
		
		// insert a city (if not exists)
		insert : function(city){
			exists = this.getByName(city.getName())
			if (exists == null) {
				this.add(city) ;
				return city ;
			} else {
				return exists ;
			}
		},
		
		// return the best path for requested journey
		getTrip : function(departureCid, arrivalCid, tripMode){
			var that = this ;
			var departureCity = this.get(departureCid);
			var arrivalCity = this.get(arrivalCid);
			var trip = new Trip({
				departure : departureCity, 
				arrival : arrivalCity,
			})
			var optimized = trip ;
			getStep = function(trip){
				if (trip.matching(optimized.getRelevance())) {
					if (trip.getRelevance() < optimized.getRelevance() || optimized.getRelevance() == null) {
						optimized = trip ;
					}
				} else {
					if (!trip.isBad()){
						var currentStep = that.getByName(trip.getCurrentStep().getName());
						var enableDestinations = currentStep.getDestinations() ;
						enableDestinations.each(function(destination){
							newRoute = new Trip({
								departure : departureCity, 
								arrival : arrivalCity,
								relevance : trip.getRelevance()
							}) ;
							newRoute.setTraveled(trip.getTraveled()) ;
							newRoute.addStep(destination, tripMode) ;
							getStep(newRoute) ;
						});
					}
				}
			}
			getStep(trip) ;
			return optimized ;
		}
		
	});
	return CityList ;
	
});