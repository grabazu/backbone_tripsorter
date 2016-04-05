
define([
	'backbone',
	'models/tripService',
	"text!templates/tripSelect.html",
	"text!templates/tripResponse.html"
], function(
	Backbone,
	TripService,
	TripSelect,
	TripResponse
){
	
	var TripView = Backbone.View.extend({
		el : '#tripsorter',
		departures : [],
		arrivals : [],
		departure : '',
		arrival : '',
		tripMode : 'fast',
		service : null,
		json : null,
		template : null,
		initialize : function(){
			that = this ;
			this.service = new TripService();
			this.service.on("change:ready", function(){ 
				that.departures = that.service.getCities().toJSON() ;
				that.showSelectTrip();
			});
		},
		events : {
			'change #departure' : 'setDeparture',
			'change #arrival' : 'setArrival',
			'click #cheapmode' : 'setCheapMode',
			'click #fastmode' : 'setFastMode',
			'click #search' : 'showResult',
			'click #reset' : 'showSelectTrip',
		},
		
		setDeparture : function(data){
			var that = this ;
			var i = 0 ;
			_.each(this.departures, function(city){
				if(city.cid !== data.target.value){
					city.selected = false ;
					that.arrivals[i] = city ;
					i++ ;
				} else {
					city.selected = true ;
				}
			});
			this.departure = data.target.value ;
			this.arrival = '' ;
			this.showSelectTrip();
		},
		
		setArrival : function(data){
			this.arrival = data.target.value ;
			this.showSelectTrip();
		},
		
		setCheapMode : function(){
			this.tripMode = 'cheap' ;
			this.showSelectTrip();
		},
		
		setFastMode : function(){
			this.tripMode = 'fast' ;
			this.showSelectTrip();
		},
		
		/**
		* Create the JSON object to send in TripSelect template
		* Select the template TripSelect for render
		*/
		showSelectTrip : function(){
			this.json = {
				'mode' : this.tripMode,
				'departures' : this.departures,
				'arrivals' : this.arrivals,
				'departure' : this.departure,
				'arrival' : this.arrival,
			}
			this.template = _.template(TripSelect) ;
			this.render() ;
		},
		
		/**
		* Create the JSON object to send in TripResponse template
		* Select the template TripResponse for render
		*/
		showResult : function(){
			if(this.arrival != '' && this.departure != ''){
				this.json = this.service.getTrip(this.departure, this.arrival, this.tripMode).getDetailToJSON(),
				this.template = _.template(TripResponse) ;
				this.render() ;
			}
		},
		render : function() {
			this.$el.html(this.template({ json : this.json }));
			return this ;
		}
	});
	return TripView ;
});