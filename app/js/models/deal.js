define([
	'backbone'
], function(
	Backbone
){
	
	var Deal = Backbone.Model.extend({
		defaults : {
			duration : 0,
		},
		initialize : function() {
			var discount = (this.get('deal').cost * this.get('deal').discount) / 100 ;
			this.set('cost', this.get('deal').cost - discount );
			this.set('transport', this.get('deal').transport);
			this.set('duration', (this.get('deal').duration.h * 60) + (this.get('deal').duration.m)*1);
			this.set('departure', this.get('deal').departure );
			this.set('arrival',  this.get('deal').arrival);
			this.set('reference', this.get('deal').reference);
			this.set('deal', null);
		},
		getCost : function(){
			return this.get('cost');
		},
		getDuration : function() {
			return this.get('duration');
		},
		getTransport : function() {
			return this.get('transport');
		},
		getDeparture : function(){
			return this.get('departure');
		},
		getArrival : function(){
			 return this.get('arrival'); 
		},
		getReference : function(){
			return this.get('reference');
		},
	});
	return Deal ;
	
});