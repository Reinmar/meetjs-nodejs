'use strict';

var http = require('http'),
	fs = require('fs'),
	url = require('url');

http.createServer(function (req, res) {
	var file = url.parse(req.url, true).query.file;

	res.writeHead(200, { 'Content-Type': 'text/plain' });

	if (file) {
		file = file.replace(/\//g, '');

		fs.readFile(file, function (err, data) {
			if (err) {
				res.write('Error!\n');
				res.write(err.message);
			}
			else {
				res.write(data);
			}

			res.end();
		});
	}
	else {
		res.end();
	}
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
