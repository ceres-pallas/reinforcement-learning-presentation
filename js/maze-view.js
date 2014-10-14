 /*global window, module, document*/
(function($, document){
	'use strict';
	var MazeView = $.MazeView = function(model, container, options){
		this.model = model;
		this.container = container;
		this.options = options || { width: 40, height: 30 };
		this.update();
	};
	MazeView.prototype.update = function(){
		var ctx = this.context();
		ctx.save();
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
