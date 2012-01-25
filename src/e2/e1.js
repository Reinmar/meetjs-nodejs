var http = require('http');

http.createServer(function (req, res) {
	var counter = 0,
		write = function self() {
			res.write(counter + ': 500ms\n');

			counter += 1;

			if (counter < 10) {
				setTimeout(self, 500);
			}
			else {
				res.end();
			}
		};

	res.writeHead(200, { 'Content-Type': 'text/plain' });

	write();
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
