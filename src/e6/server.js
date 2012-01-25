var http = require('http'),
	socketio = require('socket.io'),
	fs = require('fs'),
	server,
	colors = {};

server = http.createServer(function (req, res) {
	var file = req.url.replace(/\//g, '') || 'index.html';

	fs.readFile(__dirname + '/' + file,
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading ' + file);
		}

		res.writeHead(200);
		res.end(data);
	});
});

server.listen(1337);

server_socket = socketio.listen(server);

server_socket.sockets.on('connection', function (socket) {
	socket.on('draw', function (pos) {
		socket.broadcast.emit('draw', {
			color: colors[socket.id],
			pos: pos
		});
	});

	var hue = ~~(Math.random() * 255),
		color = 'hsl(' + hue + ', 50%, 50%)';

	colors[socket.id] = color;
	socket.emit('color', color);
});
