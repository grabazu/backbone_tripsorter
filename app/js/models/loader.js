define([
	'backbone',
	'models/city',
	'models/destination',
	'models/deal',
	'collections/cityList',
	'collections/tripLoaderDealList'
], function(
	Backbone,
	City,
	Destination,
	Deal,
	CityList,
	TripLoaderDealList
){
	
	var Loader = Backbone.Model.extend({ 
		defaults : {
			ready : false,
		},
		initialize : function(){
			var that = this ;
			var cities = new CityList() ;
			var deals = new TripLoaderDealList();
			
			// Load deals from json file
			deals.getDeals().success(function(data){ 
				_.each(data.deals, function(deal){
					
					// create a new departure city
					var from = new City({name : deal.departure});
					from = cities.insert(from);
					
					// create a new destination city
					var to = new Destination({name : deal.arrival});
					
					// set TO as Destination for FROM
					to = from.getDestinations().insert(to);
					to.addDeal(deal);
				});
				that.set('cities', cities);
				
				// change the tripService state after loading
				that.set('ready', true) ;
			});
		},
		getCities : function(){
			return this.get('cities') ;
		},
		getTrip : function(departure, arrival, tripMode){
			return this.get('cities').getTrip(departure, arrival, tripMode) ;
		},
		getReady : function(){
			return this.get('ready') ;
		}
	}) ;
	return Loader ;
});