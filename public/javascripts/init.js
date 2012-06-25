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

$(document).ready(function() {
	alert('test');
});