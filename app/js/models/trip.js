define([
	'backbone',
	'models/city',
	'collections/cityList',
	'collections/dealList'
], function(
	Backbone,
	City,
	CityList,
	DealList
){
	
	var Trip = Backbone.Model.extend({
		defaults : {
			isBad : false,
			relevance:null,
		},
		initialize : function(){
			this.set('steps', new Backbone.Collection()) ;
			this.get('steps').add(this.get('departure')) ;
		},
		getCurrentStep : function(){
			return this.get('steps').at(this.get('steps').length-1) ;
		},
		matching : function(maxRelevance){
			if (maxRelevance == null || this.get('relevance') < maxRelevance){
				if (this.getCurrentStep().getName() === this.get('arrival').getName()) {
					return true ;
				} else {
					return false ;
				}
			} else {
				this.set('isBad', true) ;
			}
		},
		getTraveled : function(){
			return this.get('steps').filter(function(item) {
				return item ;
			});
		},
		setTraveled : function(steps){
			that = this ;
			_.each(steps, function(step){
				that.get('steps').add(step) ;
			});
		},
		isLoop : function(step){
			var result = this.get('steps').find(function(model) {
				return model.getName() === step.getName();
			});
			if (result != null) {
				return true ;
			} else {
				return false ;
			}
		},
		isBad : function(){
			return this.get('isBad') ;
		},
		addStep : function(step, tripMode){
			if(this.isLoop(step)){
				this.set('isBad', true);
			} else {
				if (tripMode === 'fast') {
					var deal = step.getFastest();
					this.addRelevance(deal.getDuration());
				}else{
					var deal = step.getCheapest();
					this.addRelevance(deal.getCost());
				}
				step.setComing(deal) ;
				this.get('steps').add(step);
			}
		},
		addRelevance : function(toAdd){
			if(this.get('relevance') == null){
				this.set('relevance', 0) ;
			}
			this.set('relevance', this.get('relevance') + toAdd);
		},
		getRelevance : function(){
			return this.get('relevance') ;
		},
		getSteps : function(){
			return this.get('steps');
		},
		
		// Generate the JSON object for template display
		getDetailToJSON : function(){
			var steps = [] ;
			var i = 0 ;
			var totalDuration = 0 ;
			var totalCost = 0 ;
			this.get('steps').each(function(step){
				if (step.getComing() != null) {
					totalDuration += step.getComing().getDuration();
					totalCost += step.getComing().getCost();
					var hours = Math.floor(step.getComing().getDuration() / 60) ;
					if (hours < 10) {
						hours = '0' + hours ;
					}
					var minutes =  step.getComing().getDuration()  % 60 ;
					if (minutes < 10) {
						minutes = '0' + minutes ;
					}
					steps[i] = {
						'name' : step.getName(),
						'hours' : hours,
						'minutes' : minutes,
						'duration': step.getComing().getDuration(),
						'reference' : step.getComing().getReference(),
						'transport' : step.getComing().getTransport(),
						'cost' : step.getComing().getCost(),
					}
				} else {
					steps[i] = {
						'name' : step.getName(),
						'duration' : 0,
						'hours' : null,
						'minutes' : null,
						'transport' : null,
						'reference' :null,
						'cost' : 0,
					}
				}
				i++ ;
			});
			totalhours = Math.floor(totalDuration / 60) ;
			totalmin = totalDuration % 60 ;
			if (totalhours < 10) {
				totalhours = '0' + totalhours ;
			}
			if (totalmin < 10) {
				totalmin = '0' + totalmin ;
			}
			return {
				'duration' : totalhours + 'h' + totalmin,
				'cost' : totalCost,
				'steps': steps,
			}
		}
	});
	return Trip ;
	
});