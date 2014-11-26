/* global window, document, Reveal, Position, SimpleAgent, FunctionApproximator, Util*/
;(function(document, Reveal, Maze, MazeView, Position, SimpleAgent, FunctionApproximator, Helper){
	'use strict';
	var maze = new Maze();
	maze.addObstruction(-1, -1);
	maze.addObstruction(0, -1);
	maze.addObstruction(1, -1);
	maze.addObstruction(2, -1);
	maze.addObstruction(3, -1);
	maze.addObstruction(4, -1);
	maze.addObstruction(4, 0);
	maze.addObstruction(4, 1);
	maze.addObstruction(4, 2);
	maze.addObstruction(4, 3);
	maze.addObstruction(3, 3);
	maze.addObstruction(2, 3);
	maze.addObstruction(1, 3);
	maze.addObstruction(0, 3);
	maze.addObstruction(-1, 3);
	maze.addObstruction(-1, 2);
	maze.addObstruction(-1, 1);
	maze.addObstruction(-1, 0);

	maze.addObstruction(1, 1);

	maze.addGoal(3, 2);
	maze.addGoal(3, 1, -1);

	var isSetup = {
		'walkthrough1': false,
		'walkthrough2': false,
		'walkthrough3': false,
		'walkthrough4': false,
		'walkthrough6': false,
		'walkthrough5': false
	};
	Reveal.addEventListener('walkthrough-1', function(){
		if (!isSetup.walkthrough1) {
			isSetup.walkthrough1 = true;
			var container = document.getElementById('walkthrough-1-maze');

			new MazeView(maze, container, {
				width: 480, height: 400,
				rewardColor: { positive: 'green', negative: 'red' }
			});
		}
	});
	Reveal.addEventListener('walkthrough-2', function(){
		if (!isSetup.walkthrough2) {
			isSetup.walkthrough2 = true;
			var container = document.getElementById('walkthrough-2-maze');

			var view = new MazeView(maze, container, {
				width: 480, height: 400,
				rewardColor: { positive: 'green', negative: 'red' }
			});

			var ctx = view.context();
			var dx = view.options.dx;
			var dy = view.options.dy;
			var mx = view.options.mx;
			var my = view.options.my;

			ctx.fillStyle = 'blue';
			ctx.font = '15px sans-serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			[
				{ x: 3 , y: 0, value: 1},
				{ x: 2 , y: 0, value: 0.96},
				{ x: 1 , y: 0, value: 0.92},
				{ x: 0 , y: 0, value: 0.88},
				{ x: 0 , y: 1, value: 0.84},
				{ x: 0 , y: 2, value: 0.80}
			].forEach(function(data){
				ctx.fillText(
					data.value,
					dx * (data.x - mx + 0.5),
					dy * (data.y - my + 0.5)
				);
			});
		}
	});
	Reveal.addEventListener('walkthrough-3', function(){
		if (!isSetup.walkthrough3) {
			isSetup.walkthrough3 = true;
			var container = document.getElementById('walkthrough-3-maze');

			var view = new MazeView(maze, container, {
				width: 480, height: 400,
				rewardColor: { positive: 'green', negative: 'red' }
			});

			var ctx = view.context();
			var dx = view.options.dx;
			var dy = view.options.dy;
			var mx = view.options.mx;
			var my = view.options.my;

			ctx.fillStyle = 'blue';
			ctx.font = '15px sans-serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			[
				{ x: 3 , y: 0, value: 1},
				{ x: 2 , y: 0, value: 0.096},
				{ x: 1 , y: 0, value: 0.092},
				{ x: 0 , y: 0, value: 0.088},
				{ x: 0 , y: 1, value: 0.084},
				{ x: 0 , y: 2, value: 0.080},
				{ x: 2 , y: 1, value: 0},
				{ x: 3 , y: 1, value: 0},
				{ x: 1 , y: 2, value: 0},
				{ x: 2 , y: 2, value: 0},
				{ x: 3 , y: 2, value: 0},
			].forEach(function(data){
				ctx.fillText(
					data.value,
					dx * (data.x - mx + 0.5),
					dy * (data.y - my + 0.5)
				);
			});
		}
	});
	Reveal.addEventListener('walkthrough-4', function(){
		if (!isSetup.walkthrough4) {
			isSetup.walkthrough4 = true;
			var container = document.getElementById('walkthrough-4-maze');

			var view = new MazeView(maze, container, {
				width: 480, height: 400,
				rewardColor: { positive: 'green', negative: 'red' }
			});

			var ctx = view.context();
			var dx = view.options.dx;
			var dy = view.options.dy;
			var mx = view.options.mx;
			var my = view.options.my;

			ctx.fillStyle = 'blue';
			ctx.font = '15px sans-serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			[
				{ x: 0 , y: 0, value: 0.01},
				{ x: 1 , y: 0, value: 0.07},
				{ x: 2 , y: 0, value: 0.26},
				{ x: 3 , y: 0, value: 1},
				{ x: 0 , y: 1, value: -0.16},
				{ x: 2 , y: 1, value: -0.47},
				{ x: 3 , y: 1, value: -1},
				{ x: 0 , y: 2, value: -0.28},
				{ x: 1 , y: 2, value: -0.43},
				{ x: 2 , y: 2, value: -0.62},
				{ x: 3 , y: 2, value: -0.82},
			].forEach(function(data){
				ctx.fillText(
					data.value,
					dx * (data.x - mx + 0.5),
					dy * (data.y - my + 0.5)
				);
			});
		}
	});
	Reveal.addEventListener('walkthrough-5', function(){
		if (!isSetup.walkthrough5) {
			isSetup.walkthrough5 = true;
			var container = document.getElementById('walkthrough-5-maze');

			var view = new MazeView(maze, container, {
				width: 480, height: 400,
				rewardColor: { positive: 'green', negative: 'red' }
			});

			var ctx = view.context();
			var dx = view.options.dx;
			var dy = view.options.dy;
			var mx = view.options.mx;
			var my = view.options.my;

			ctx.fillStyle = 'blue';
			ctx.font = '15px sans-serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			[
				{ x: 0 , y: 0, value: '→'},
				{ x: 1 , y: 0, value: '→'},
				{ x: 2 , y: 0, value: '→'},
				{ x: 3 , y: 0, value: 1},
				{ x: 0 , y: 1, value: '↑'},
				{ x: 2 , y: 1, value: '↑'},
				{ x: 3 , y: 1, value: -1},
				{ x: 0 , y: 2, value: '↑'},
				{ x: 1 , y: 2, value: '←'},
				{ x: 2 , y: 2, value: '←'},
				{ x: 3 , y: 2, value: '←'},
			].forEach(function(data){
				ctx.fillText(
					data.value,
					dx * (data.x - mx + 0.5),
					dy * (data.y - my + 0.5)
				);
			});
		}
	});
	Reveal.addEventListener('walkthrough-6', function(){
		if (!isSetup.walkthrough6) {
			isSetup.walkthrough6 = true;
			var container = document.getElementById('walkthrough-6-maze');

			var view = new MazeView(maze, container, {
				width: 480, height: 400,
				rewardColor: { positive: 'green', negative: 'red' }
			});

			var dx = view.options.dx;
			var dy = view.options.dy;
			var mx = view.options.mx;
			var my = view.options.my;

			var canvas = document.createElement('canvas');
			canvas.width = 480;
			canvas.height = 400;
			container.appendChild(canvas);
			var ctx = canvas.getContext('2d');

			ctx.fillStyle = 'blue';
			ctx.font = '15px sans-serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

		    var functionApproximator = new FunctionApproximator(
			Math.random,
			0.1,
			0,
			function(elements) { return elements[Math.floor((Math.random() * elements.length))]; }
		    );

		    functionApproximator.addValueFunction(
			functionApproximator.createValueFunction(function(s) { return s.x; }, function(){ return 0.5;} )
		    );
		    functionApproximator.addValueFunction(
			functionApproximator.createValueFunction(function(s) { 
			    return s.y; }, function(){return 0.2;} )
		    );
		    functionApproximator.addValueFunction(
			functionApproximator.createValueFunction(function() { return 1; }, function(){return 0.1;} )
		    );

		    var agent = new SimpleAgent(maze, functionApproximator);
		    var order = [
			{state: new Position(0, 0), action: 'right'}, 
			{state: new Position(1, 0), action: 'right'}, 
			{state: new Position(2, 0), action: 'right'}, 
			{state: new Position(3, 0), action: 'right'}, 
			{state: new Position(3, 1), action: 'up'},
		    ];
		    var orderIndex = 0;
		    agent.chooseAction = function() {
			if(orderIndex === order.length) {
			    orderIndex = 0;
			}
			var returnValue = order[orderIndex];
			orderIndex++;
			return returnValue;
		    };
		    
		    var currentMazeValueStructure = function() {
			return [
				{ x: 0 , y: 0, value: agent.solver.getValue({x:0,y:2}).toPrecision(3)},
				{ x: 1 , y: 0, value: agent.solver.getValue({x:1,y:2}).toPrecision(3)},
				{ x: 2 , y: 0, value: agent.solver.getValue({x:2,y:2}).toPrecision(3)},
				{ x: 3 , y: 0, value: agent.solver.getValue({x:3,y:2}).toPrecision(3)},
				{ x: 0 , y: 1, value: agent.solver.getValue({x:0,y:1}).toPrecision(3)},
				{ x: 2 , y: 1, value: agent.solver.getValue({x:2,y:1}).toPrecision(3)},
				{ x: 3 , y: 1, value: agent.solver.getValue({x:3,y:1}).toPrecision(3)},
				{ x: 0 , y: 2, value: agent.solver.getValue({x:0,y:0}).toPrecision(3)},
				{ x: 1 , y: 2, value: agent.solver.getValue({x:1,y:0}).toPrecision(3)},
				{ x: 2 , y: 2, value: agent.solver.getValue({x:2,y:0}).toPrecision(3)},
				{ x: 3 , y: 2, value: agent.solver.getValue({x:3,y:0}).toPrecision(3)}
			];
		    };


		    var run = function() {
			if(!maze.ended) {
			    var option = agent.chooseAction();

			    agent.performAction(option);
			    run();
			} else {
			    
			    var g = 0;
			    while(g < agent.history.length - 1) {
				agent.history = Helper.StateLoopRemover.removeLoop(agent.history, g);
				g++;
			    }
			    agent.reevaluateActions(maze.rewardFor([maze.currentState().x, maze.currentState().y]), 0.04);
			}	
		    };

		    var drawNumbers = function() {
			ctx.clearRect(0,0, 480,400);
			
			currentMazeValueStructure().forEach(function(data){
			    ctx.fillText(
				data.value,
				dx * (data.x - mx + 0.5),
				dy * (data.y - my + 0.5)
			    );
			});
		    };
		    drawNumbers();
		    var body = document.getElementsByTagName('body')[0];
			
		    body.addEventListener('keydown', function(e){
			switch(e.keyCode) {
			case 65: /* a */
			    maze.ended = false;
			    maze.currentState({x:0, y:0});
    
			    run();
			    
			    drawNumbers();
			    order = [
				{state: new Position(0, 1), action: 'up'}, 
				{state: new Position(0, 2), action: 'up'}, 
				{state: new Position(1, 2), action: 'right'}, 
				{state: new Position(2, 2), action: 'right'},
				{state: new Position(3, 2), action: 'right'},
			    ];
			    break;
			}
		    });
			    
		    
		}
	});
})(document, Reveal, window.Maze, window.MazeView, Position, SimpleAgent, FunctionApproximator, Util);
