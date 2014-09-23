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
		this._obstructions = [];
	        this._state = {
		    x: 0,
		    y: 0
		};
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
	Maze.prototype.addObstruction = function(x, y) {
		this._obstructions.push(new Position(x, y, 0));
	}
	Maze.prototype.obstructions = function(){
		return this._obstructions.map(function(position){ return position.state(); });
	}
        Maze.prototype.isObstructed = function(state) {
	    return this._obstructions.filter(function(position){
			return position.at(state);
		}).length > 0;
	} 

        Maze.prototype.currentState = function(state) {
	    if(state) {
		this._state = state;
	    }
	    

	    return this._state;
	}

        Maze.prototype.getPossibleActions = function() {
	    var possibleActions = [
		{state: {x: this._state.x, y: this._state.y + 1}, action: "up"}, 
		{state: {x: this._state.x + 1, y: this._state.y}, action: "right"}, 
		{state: {x: this._state.x, y: this._state.y - 1}, action: "down"}, 
		{state: {x: this._state.x - 1, y: this._state.y}, action: "left"}];
	    
	    var spliceAction = function(action) {
		return this.filter(function(it) {
		    return it.action != action;
		});
	    }

	    if(this.isObstructed([this._state.x, this._state.y+1])) {
		possibleActions = spliceAction.call(possibleActions, "up");
	    }
	    if(this.isObstructed([this._state.x+1, this._state.y])) {
		possibleActions = spliceAction.call(possibleActions, "right");	
	    }
	    if(this.isObstructed([this._state.x, this._state.y-1])) {
		possibleActions = spliceAction.call(possibleActions, "down");
	    }
	    if(this.isObstructed([this._state.x-1, this._state.y])) {
		possibleActions = spliceAction.call(possibleActions, "left");
	    }
	    return possibleActions;
	}

	var MazeView = $.MazeView = function(model, container, options){
		this.model = model;
		this.container = container;
		this.options = options || { width: 40, height: 30 };
		this.update();
	};
	MazeView.prototype.update = function(){
		var ctx = this.context();
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

        
})(window || module.exports);
