/**
 * Module dependencies.
 */
// Load requires
var express = require('express'), routes = require('./routes');
var net = require('net');
var io = require('socket.io');
var TrackingProvider = require('./mongotracking.js').TrackingProvider;
console.log(TrackingProvider);

// Create servers
var app = module.exports = express.createServer(), io = io.listen(app);
var wss;

net.createServer(function(socket) {
	socket.on('connect', function() {
		console.log("Client connected")
	});

	socket.on('listening', function(data) {
		console.log("Listening " + data)
	});

	socket.on('error', function(data) {
		console.log(data)
	});

	socket.on('data', function(data) {
		//console.log("Data received: " + data)
		//socket.write("ack");
		//wss.emit("data", "hello");
		jsonData = JSON.parse(data.toString());
		acc = {}
		acc.ts = jsonData.ts
		
		wss.emit("acc", acc)		
	});
	socket.on('end', function() {
		console.log("server disconnected")
	});

}).listen(2500);

// Configuration

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(require('stylus').middleware({
		src : __dirname + '/public',
		compress: true		
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

var trackingProvider = new TrackingProvider('localhost', 27017);

// Sockets
var websocketList = [];
wss = io.sockets.on('connection', function(websocket) {
	websocketList.push(websocket);
	console.log(websocketList.length + " connections");

	websocket.on('disconnect', function() {
		websocketList.splice(websocketList.indexOf(websocket), 1);
		console.log(websocketList.length + " connections");
	});

	websocket.on('my other event', function(data) {
		console.log(data);
	});
});

// Routes

// Web interface
app.get('/', routes.index);
app.get('/test', routes.test);
app.get('/transactions', routes.transactions);

// handling mobile requests
app.post('/mobile/loc', function(req, res) {
	console.log("Received from WSS: " + req.body.data);
	wss.emit("latlng", req.body.data)
	
	trackingProvider.save(
			req.body.data
			, function( error, docs) {
        //res.redirect('/')
				console.log("???")
    });
	
	res.end("OK");
});
console.log("starting server")

app.listen(80, function() {
	console.log("Express server listening on port %d in %s mode",
			app.address().port, app.settings.env);
});

// Custom web socket events
// latlng --> for GPS/network location updates from mobile to Web UI
// transaction --> new transaction info (completed, cancelled)
// mobile_on --> mobile phone switched on
// mobile_off --> mobile phone switched off
//