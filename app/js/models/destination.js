define([
	'backbone',
	'models/city',
	'collections/dealList'
], function(
	Backbone,
	City,
	DealList
){
	
	var Destination = City.extend({
		
		initialize : function(){
			this.set('deals', new DealList()) ;
		},
		addDeal : function(deal){
			this.get('deals').addDeal(deal) ;
		},
		setComing : function(deal){
			this.set('coming', deal);
		},
		getFastest : function(){
			return this.get('deals').getFastest();
		},
		getCheapest : function(){
			return this.get('deals').getCheapest();
		}
	}) ;
	return Destination ;
});