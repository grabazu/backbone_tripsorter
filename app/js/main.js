require.config({
	paths: {
		"jquery" : "bower_components/jquery/dist/jquery" ,
		"underscore":"bower_components/underscore/underscore",
		"backbone":"bower_components/backbone/backbone",
		"text" : "bower_components/text/text",
		"mocha" : "bower_components/mocha/mocha",
		"chai" : "bower_components/chai/chai"
	}
});

require(['app'], function(App){ });
