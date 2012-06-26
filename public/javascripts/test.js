
var socket = io.connect();
socket.on('news', function(data) {
	console.log(data);
	socket.emit('my other event', {
		my : 'data'
	});
});

socket.on('time', function(data) {
	console.log(data);
});

var map;
function initialize() {
	var myOptions = {
		zoom : 8,
		center : new google.maps.LatLng(-34.397, 150.644),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map'), myOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);