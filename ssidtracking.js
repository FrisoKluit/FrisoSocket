var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
console.log("Setting up DB");

SSIDProvider = function(host, port) {
	console.log("Mongo: Setting up DB SSID");
	this.db = new Db('logistics-tracking', new Server(host, port, {
		auto_reconnect : true
	}, {}));
	this.db.open(function() {
	});
};

SSIDProvider.prototype.getCollection = function(callback) {
	console.log("Mongo: in getCollection");
	this.db.collection('ssid', function(error, article_collection) {
		if (error)
			callback(error);
		else
			callback(null, article_collection);
	});
};

SSIDProvider.prototype.save = function(tracks, callback) {
	console.log("Mongo: in save");
	this.getCollection(function(error, track_collection) {
		if (error)
			callback(error)
		else {
			if (typeof (tracks.length) == "undefined")
				tracks = [ tracks ];

			for ( var i = 0; i < tracks.length; i++) {
				track = tracks[i];
				track.created_at = new Date();
				// if( article.comments === undefined ) article.comments = [];
				// for(var j =0;j< article.comments.length; j++) {
				// article.comments[j].created_at = new Date();
				// }
			}
			console.log("Going to insert");
			track_collection.insert(tracks, function() {
				console.log("inserted")
				callback(null, tracks);
			});
		}
	});
};

exports.SSIDProvider = SSIDProvider;
