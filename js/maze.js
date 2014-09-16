/*global window, module*/
(function($){
	'use strict';
	var Position = function(x, y, reward) {
		this.x = x;
		this.y = y;
		this._reward = reward;
	};
	Position.prototype.state = function(){
		return [this.x, this.y];
	};
	Position.prototype.reward = function(){
		return this._reward;
	}
	Position.prototype.at = function(state) {
		return this.x == state[0] && this.y == state[1];
	}

	var Maze = $.Maze = function(){
		this._goals = [];
	};

	Maze.prototype.addGoal = function(x, y, reward){
		reward = reward || 1;
		this._goals.push(new Position(x, y, reward));

	};
	Maze.prototype.goals = function(){
		return this._goals.map(function(position){ return position.state(); });
	};
	Maze.prototype.rewardFor = function(state){
		return this._goals.filter(function(position){
			return position.at(state);
		}).reduce(function(subtotal, current){ return subtotal + current.reward(); }, 0);
	};
})(window || module.exports);
