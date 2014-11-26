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

	var isSetup = {
		'walkthrough1': false
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
})(document, Reveal, window.Maze, window.MazeView);
