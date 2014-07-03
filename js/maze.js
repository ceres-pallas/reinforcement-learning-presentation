/*global window, module*/
(function($){
	'use strict';
	var Position = function(x, y) {
		this.x = x;
		this.y = y;
	};
	Position.prototype.state = function(){
		return [this.x, this.y];
	};

	var Maze = $.Maze = function(){
		this._goals = [];
	};

	Maze.prototype.addGoal = function(x, y){
		this._goals.push(new Position(x, y));

	};
	Maze.prototype.goals = function(){
		return this._goals.map(function(position){ return position.state(); });
	};
})(window || module.exports);
