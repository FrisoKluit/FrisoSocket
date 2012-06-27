/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {
		title : 'Express',
		scripts : [],
		css : []
	})
};

exports.test = function(req, res) {
	res.render('test', {
		data : 'test',
		title : "Friso is here",
		css : [ '/stylesheets/test.css', '/stylesheets/menu.css' ],
		scripts : [
				'//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
				'//maps.googleapis.com/maps/api/js?sensor=false',
				'/socket.io/socket.io.js', '/javascripts/test.js' ]
	})
};