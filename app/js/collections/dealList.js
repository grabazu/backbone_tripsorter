define([
	'backbone',
	'models/deal'
], function(
	Backbone,
	Deal
){
	
	var DealList = Backbone.Collection.extend({
		model : Deal,
		addDeal : function(toAdd){
			var newDeal = new Deal({deal : toAdd});
			this.add(newDeal);
		},
		
		// Return the cheapest item in collection
		getCheapest : function(){
			var cheapest = null ;
			this.each(function(deal){
				if (cheapest == null || deal.getCost() < cheapest.getCost()){
					cheapest = deal ;
				}
			});
			return cheapest ;
		},
		
		// Return the fastest item in collection
		getFastest : function(){
			var fastest = null ;
			this.each(function(deal){
				if (fastest == null || deal.getDuration() < fastest.getDuration()){
					fastest = deal ;
				}
			});
			return fastest ;
		}
	});
	return DealList ;
});