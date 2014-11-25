 /*global window, module, document*/
(function($, document){
	'use strict';
	var MazeView = $.MazeView = function(model, container, options){
		this.model = model;
		this.container = container;
		this.options = options || { width: 40, height: 30, rewardColor: { positive: 'green', negative: 'red' } };
		var deltas = this.deltas();
		this.options.dx = deltas[0];
		this.options.dy = deltas[1];
		this.options.mx = deltas[2];
		this.options.my = deltas[3];
		this.update();
	};
	MazeView.prototype.deltas = function(){
		var maxima = this.model.obstructions().reduce(function(maxima, position){
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
		return [
			this.options.width/(maxima.max[0] - maxima.min[0]),
			this.options.height/(maxima.max[1] - maxima.min[1]),
			maxima.min[0],
			maxima.min[1]
		];
	};
	MazeView.prototype.update = function(){
		var ctx = this.context();
		var dx = this.options.dx;
		var dy = this.options.dy;
		var mx = this.options.mx;
		var my = this.options.my;
		ctx.save();
		ctx.translate(0, this.options.height);
		ctx.scale(1, -1);
		ctx.fillStyle = 'white';
		ctx.fillRect(0,0, this.options.width, this.options.height);
		ctx.fillStyle = 'black';
		this.model.obstructions().forEach(function(position){
			var x = position[0], y = position[1];
			ctx.fillRect((x - mx) * dx, (y - my) * dy, dx, dy);

		});
		ctx.fillStyle = this.options.rewardColor.positive;
		this.model
			.goals(function(goal){ return goal.reward() > 0; })
			.forEach(function(position){
				var x = position[0], y = position[1];
				ctx.fillRect((x - mx) * dx, (y - my) * dy, dx, dy);
			});
		ctx.fillStyle = this.options.rewardColor.negative;
		this.model
			.goals(function(goal){ return goal.reward() < 0; })
			.forEach(function(position){
				var x = position[0], y = position[1];
				ctx.fillRect((x - mx) * dx, (y - my) * dy, dx, dy);
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
