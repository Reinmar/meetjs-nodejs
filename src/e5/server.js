var restify = require('restify'),
	server = restify.createServer(),
	store = {};

server.get('/:key', function (req, res) {
	var key = req.uriParams.key;

	if (key in store) {
		res.send(200, store[key]);
	}
	else {
		res.send(404, 'Key not found');
	}
});

server.put('/:key', function (req, res) {
	var key = req.uriParams.key;
	store[key] = req.params.value;

	res.send(200);
});

server.del('/:key', function (req, res) {
	var key = req.uriParams.key;

	if (key in store) {
		delete store[key];
		res.send(200);
	}
	else {
		res.send(404, 'Key not found');
	}
});

server.listen(1337);
