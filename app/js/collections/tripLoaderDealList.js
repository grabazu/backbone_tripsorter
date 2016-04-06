define([
	'backbone'

], function(
	Backbone
){
	var TripLoaderDealList = Backbone.Collection.extend({ 
		url:"../datas/response.json",
		
		getDeals : function(){
			var deals = this.fetch().success(function(data){
				return data.deals ;
			});
			return deals ;
		}
	}) ;
	return TripLoaderDealList ;
});