var socket = io.connect();

socket.on('connect', function() {
	//alert("inline");
	$('#onlinestatus').attr("src", "/images/online.png");
});

socket.on('disconnect', function() {
	$('#onlinestatus').attr("src", "/images/offline.png");
});

socket.on('news', function(data) {
	console.log(data);
//	socket.emit('my other event', {
//		my : 'data'
//	});
});

socket.on('time', function(data) {
	console.log(data);
});

var map;
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
