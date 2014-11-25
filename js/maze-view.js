 /*global window, module, document, console*/
(function($, document){
	'use strict';
	var MazeView = $.MazeView = function(model, container, options){
		this.model = model;
		this.container = container;
		this.options = options || { width: 40, height: 30 };
		var deltas = this.deltas();
		this.options.dx = deltas[0];
		this.options.dy = deltas[1];
		this.update();
	};
	MazeView.prototype.deltas = function(){
		var maxima = this.model.obstructions().reduce(function(maxima, position){
			console.log(position);
			return {
				min: [
					Math.min(maxima.min[0], position[0]),
					Math.min(maxima.min[1], position[1])
				],
				max: [
					Math.max(maxima.max[0], position[0] + 1),
					Math.max(maxima.max[1], position[1] + 1)
				]
			};
		}, {
			min: [ Infinity, Infinity ],
			max: [ -Infinity, -Infinity ]
		});
		console.log('%o', maxima);
		return [
			this.options.width/(maxima.max[0] - maxima.min[0]),
			this.options.height/(maxima.max[1] - maxima.min[1])
		];
	};
	MazeView.prototype.update = function(){
		var ctx = this.context();
		var dx = this.options.dx;
		var dy = this.options.dy;
		ctx.save();
		ctx.fillStyle = 'white';
		ctx.fillRect(0,0, this.options.width, this.options.height);
		ctx.fillStyle = 'black';
		this.model.obstructions().forEach(function(position){
			var x = position[0], y = position[1];
			ctx.fillRect(x * dx, y * dy, dx, dy);

		});
		ctx.restore();
	};
	MazeView.prototype.context = function(){
		if (!this._canvas) {
			var canvas = this._canvas = document.createElement('canvas');
			canvas.height = this.options.height;
			canvas.width = this.options.width;
			this.container.appendChild(canvas);
		}
		return this._canvas.getContext('2d');
	};
})(window || module.exports, document);
