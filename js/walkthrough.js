/* global window, document, Reveal, console */
;(function(document, Reveal, Maze, MazeView){
	'use strict';
	var isSetup = false;
	Reveal.addEventListener('walkthrough', function(){
		console.log('walkthrough');
		if (!isSetup) {
			isSetup = true;
			var container = document.getElementById('walkthrough-maze');

			var maze = new Maze();
			maze.addObstruction(0, 0);
			maze.addObstruction(1, 1);
			maze.addObstruction(2, 2);
			maze.addObstruction(2, 3);
			maze.addObstruction(3, 3);

			new MazeView(maze, container, { width: 320, height: 240 });
		}
	});
})(document, Reveal, window.Maze, window.MazeView);
