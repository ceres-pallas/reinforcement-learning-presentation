/* global window, document, Reveal*/
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

	var sizeMultiplier = 8;

	var isSetup = {
		'walkthrough': false
	};
	Reveal.addEventListener('walkthrough', function(){
		if (!isSetup.walkthrough) {
			isSetup.walkthrough = true;
			var container = document.getElementById('walkthrough-maze');

			new MazeView(maze, container, {
				width: sizeMultiplier * 60, height: sizeMultiplier * 50,
				rewardColor: { positive: 'green', negative: 'red' }
			});
		}
	});
})(document, Reveal, window.Maze, window.MazeView);
