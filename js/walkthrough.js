/* global window, document, Reveal, console*/
;(function(document, Reveal, Maze, MazeView){
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
		'walkthrough4': false
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
				console.log(data);
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
				console.log(data);
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
				console.log(data);
				ctx.fillText(
					data.value,
					dx * (data.x - mx + 0.5),
					dy * (data.y - my + 0.5)
				);
			});
		}
	});
})(document, Reveal, window.Maze, window.MazeView);
