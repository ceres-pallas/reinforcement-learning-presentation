/*global document: false, requestAnimationFrame, Reveal:false, World:false, InvertedPendulumView:false, Controller:false*/
;(function(document, requestAnimationFrame, Reveal, World, View, Controller){
	'use strict';
	var isSetup = false;
	Reveal.addEventListener('inverted-pendulum', function(){
		if (!isSetup) {
			isSetup = true;
			var world = new World({ g: 1/160, M: 1/4, l: 1 });

			var problem = world.createInvertedPendulum({ angle: Math.PI/50 });

			new View(document.getElementById('inverted-pendulum-playground'), problem, {
				'width': 320,
				'height': 240
			});

			var controller = new Controller();

			var body = document.getElementsByTagName('body')[0];
			body.addEventListener('keydown', function(e){
				switch(e.keyCode) {
				case 65: /* a */
					controller.left();
					break;
				case 68: /* d */
					controller.right();
					break;
				case 87: /* w */
					problem.reset();
					break;
				default:
					break; /* do nothing */
				}
			}, true);

			var run = function run(){
				problem.tick(controller.action());
				requestAnimationFrame(run);
			};
			run();
		}
	});
})(document, requestAnimationFrame, Reveal, World, InvertedPendulumView, Controller);
