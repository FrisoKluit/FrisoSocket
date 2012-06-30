var socket = io.connect();
var map;
var markerList = {};

socket.on('connect', function() {
	// alert("inline");
	$('#onlinestatus').attr("src", "/images/online.png");
});

socket.on('disconnect', function() {
	$('#onlinestatus').attr("src", "/images/offline.png");
});

socket.on('acc', function(data) {
	console.log(data)
	
});

socket.on('latlng', function(data) {
	console.log(data.lat + ", " + data.lng + ", " + data.acc);
	var myLatlng = new google.maps.LatLng(data.lat, data.lng);
	
	if (markerList[data.id]) {
		// move existing marker
		markerList[data.id].setPosition(myLatlng);
	} else {
		// create new marker
		var marker = new google.maps.Marker({
			position : myLatlng,
			map : map,
			title : data.id
		});
		markerList[data.id] = marker;
	}
});

socket.on('time', function(data) {
	console.log(data);
});

function initialize() {
	var myOptions = {
		center : new google.maps.LatLng(-34.397, 150.644),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('main'), myOptions);

	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		'address' : 'SG'
	}, function(results, status) {
		var ne = results[0].geometry.viewport.getNorthEast();
		var sw = results[0].geometry.viewport.getSouthWest();
		var vp = results[0].geometry.viewport;
		map.fitBounds(results[0].geometry.viewport);
		var newZoom = map.getZoom() + 1;
		map.setZoom(newZoom);
	});
}

$(document).ready(function() {
	initialize();
});

// google.maps.event.addDomListener(window, 'load', initialize);
