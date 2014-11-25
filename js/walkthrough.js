/* global window, document, Reveal*/
;(function(document, Reveal, Maze, MazeView){
	'use strict';
	var isSetup = false;
	Reveal.addEventListener('walkthrough', function(){
		if (!isSetup) {
			isSetup = true;
			var container = document.getElementById('walkthrough-maze');

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

			var n = 8;
			new MazeView(maze, container, {
				width: n * 60, height: n * 50,
				rewardColor: { positive: 'green', negative: 'red' }
			});
		}
	});
})(document, Reveal, window.Maze, window.MazeView);
