/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {
		title : 'Express',
		scripts: []
	})
};

exports.test = function(req, res) {
	res.render('test', {
		data : 'test',
		title : "Friso is here",
		scripts : [
				'//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
				'/socket.io/socket.io.js',
				'/javascripts/test.js']
	})
};