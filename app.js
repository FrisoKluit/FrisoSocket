/**
 * Module dependencies.
 */
// Load requires
var express = require('express'), routes = require('./routes');
var net = require('net');
var io = require('socket.io');

// Create servers
var app = module.exports = express.createServer(), io = io.listen(app);

//var tcpserver = net.createServer(function(c) { // 'connection' listener
//	console.log('TCP server connected');
//	c.on('end', function() {
//		console.log('server disconnected');
//	});
//	c.write('hello\r\n');
//	c.pipe(c);
//});
//tcpserver.listen(8124, function() { // 'listening' listener
//	console.log('TCP Server started on port 8124');
//});

net.createServer(function(socket) {
	socket.on('connection', function() {
		console.log("Client connected")
	});
	
	socket.on('listening', function(data) {
		console.log("Listening " + data)
	});
	
	socket.on('error', function(data) {
		console.log(data)
	});
	
    socket.on('data', function(data) {
    	console.log("Data received: " + data)
        socket.write("ack");
    });
    socket.on('end', function() {
    	console.log("server disconnected")
    });

})
.listen(2500);



// Configuration

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(require('stylus').middleware({
		src : __dirname + '/public'
	}));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

// Sockets

io.sockets.on('connection', function(socket) {
	socket.emit('news', {
		hello : 'world'
	});
	socket.on('my other event', function(data) {
		console.log(data);
	});
//	var tweets = setInterval(function() {
//		var data = {};
//		date = new Date();
//		data['seconds'] = date.getSeconds();
//		data['minutes'] = date.getMinutes();
//		var jsonData = JSON.stringify(data);
//
//		socket.volatile.emit('time', jsonData);
//
//	}, 1000);

	socket.on('disconnect', function() {
		console.log("Client disconneced")
	});

});

// Routes

app.get('/', routes.index);
app.get('/test', routes.test);

app.listen(80, function() {
	console.log("Express server listening on port %d in %s mode",
			app.address().port, app.settings.env);
});
