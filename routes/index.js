/*
 * GET home page.
 */

exports.test = function(req, res) {
	res.render('test', {
		title : 'Express',
		scripts : [],
		css : [ '/stylesheets/test.css', '/stylesheets/menu.css',
				'/stylesheets/footer.css', '/stylesheets/sidebar.css' ]
	})
};

exports.index = function(req, res) {
	res.render('index', {
		data : 'test',
		title : "Friso is here",
		css : [ '/stylesheets/layout.css', '/stylesheets/menu.css',
				'/stylesheets/footer.css', '/stylesheets/sidebar.css' ],
		scripts : [
				'//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
				'//maps.googleapis.com/maps/api/js?sensor=false',
				'/socket.io/socket.io.js', '/javascripts/index.js' ]
	})
};