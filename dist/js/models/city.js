define(["backbone","collections/cityList"],function(t,n){var i=t.Model.extend({defaults:{coming:null},initialize:function(){this.set("destinations",new n)},getName:function(){return this.get("name")},getDestinations:function(){return this.get("destinations")},getComing:function(){return this.get("coming")},toJSON:function(){var n=t.Model.prototype.toJSON.apply(this,arguments);return n.cid=this.cid,n}});return i});