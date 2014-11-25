/* global window, document, Reveal*/
;(function(document, Reveal, Maze, MazeView){
	'use strict';
	var isSetup = false;
	Reveal.addEventListener('walkthrough', function(){
		if (!isSetup) {
			isSetup = true;
			var container = document.getElementById('walkthrough-maze');

			var maze = new Maze();
			maze.addObstruction(0, 0);
			maze.addObstruction(1, 1);
			maze.addObstruction(2, 2);
			maze.addObstruction(2, 3);
			maze.addObstruction(3, 4);

			var n = 12;
			new MazeView(maze, container, { width: n * 40, height: n * 50 });
		}
	});
})(document, Reveal, window.Maze, window.MazeView);
