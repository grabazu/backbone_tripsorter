define([
	'backbone'

], function(
	Backbone
){
	var TripServiceList = Backbone.Collection.extend({ 
		url:"datas/response.json",
		
		getDeals : function(){
			var deals = this.fetch().success(function(data){
				return data.deals ;
			});
			return deals ;
		}
	}) ;
	return TripServiceList ;
});