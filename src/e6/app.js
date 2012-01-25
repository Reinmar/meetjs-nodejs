var GTUGPaint = function () {
	var canvas_el,
		ctx,
		is_drawing = false,
		draw_timer = null,
		mouse_pos = { x: 0, y: 0 },
		self_color = '#000',
		that;

	var draw = function self() {
			ctx.fillStyle = self_color;
			ctx.fillRect(mouse_pos.x, mouse_pos.y, 5, 5);
			
			that.onDraw && that.onDraw(mouse_pos);

			draw_timer = setTimeout(self, 25);
		},

		updateMousePosition = function (event) {
			mouse_pos = { x: event.clientX, y: event.clientY };
		},

		$ = function (id) {
			return document.getElementById(id);
		};

	canvas_el = $('canvas');
	ctx = canvas_el.getContext('2d');

	document.body.addEventListener('mousedown', function (event) {
		event.preventDefault();

		is_drawing = true;
		updateMousePosition(event);

		draw();
	});

	document.body.addEventListener('mouseup', function (event) {
		event.preventDefault();

		is_drawing = false;

		if (draw_timer) {
			clearInterval(draw_timer);
			draw_timer = null;
		}
	});

	document.body.addEventListener('mousemove', function (event) {
		event.preventDefault();
		updateMousePosition(event);
	});
	
	that = {
		draw: function (color, pos) {
			ctx.fillStyle = color;
			ctx.fillRect(pos.x, pos.y, 5, 5);
		},
		setColor: function (color) {
			self_color = color;
		},
		onDraw: null
	};

	return that;
};

//------------------------------------------------------------------------------

(function () {
	var paint = GTUGPaint(),
		socket = io.connect('http://localhost:1337');

	socket.on('draw', function (data) {
		paint.draw(data.color, data.pos);
	});

	socket.on('color', function (color) {
		paint.setColor(color);
	});

	paint.onDraw = function (pos) {
		socket.emit('draw', pos);
	};
})();
