define([
	'backbone', 
	'collections/cityList'
], function(
	Backbone,
	CityList
){
	
	var City = Backbone.Model.extend({
		defaults : {
			coming : null,
		},
		initialize : function(){
			this.set('destinations', new CityList()) ;
		},
		getName : function(){
			return this.get('name') ;
		},
		getDestinations : function(){
			return this.get('destinations');
		},
		getComing : function(){
			return this.get('coming');
		},
		toJSON: function() {
		  var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
		  json.cid = this.cid;
		  return json;
		}
	});
	return City ;
	
});