define(["backbone"],function(e){var n=e.Collection.extend({url:"../datas/response.json",getDeals:function(){var e=this.fetch().success(function(e){return e.deals});return e}});return n});