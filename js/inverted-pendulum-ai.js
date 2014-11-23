/*global document, requestAnimationFrame, Reveal, World, InvertedPendulumView, Controller, FunctionApproximator, SimpleAgent*/
;(function(document, requestAnimationFrame, Reveal, World, View, Controller, FunctionApproximator){
	'use strict';
	var isSetup = false;
	Reveal.addEventListener('inverted-pendulum-ai', function(){
		if (!isSetup) {
			isSetup = true;
			var world = new World({ g: 1/160, M: 1/4, l: 1 });

			var initialState = { angle: Math.PI/50, ended: false };
			var problem = world.createInvertedPendulum(initialState);

			var approximator = new FunctionApproximator(
				Math.random,
				0.001,
				0.01,
				function(elements) {
					return elements[Math.floor(Math.random() * elements.length)];
				},
				function(weights) {
					return 1/weights.reduce(
						function(prevMax, current){
							return Math.max(prevMax, current);
						},
						-Infinity
					);
				}
			);

			approximator.addValueFunction(
				approximator.createValueFunction(function(state) {
					return Math.abs(1/state.angle);
				})
			);

			var agent = new SimpleAgent(problem, approximator);

			new View(document.getElementById('inverted-pendulum-playground-ai'), problem, {
				'width': 320,
				'height': 240
			});

			var tickCount = 0;
			var run = function run(){
				if(!problem.currentState().ended) {
					if (tickCount % 5 === 0) {
						var option = agent.chooseAction();

						agent.performAction(option.action);
					} else {
						problem.tick();
					}
				} else {
					agent.reevaluateActions();
					problem.reset();
				}
				requestAnimationFrame(run);
			};
			run();
		}
	});
})(
	document,
	requestAnimationFrame,
	Reveal,
	World,
	InvertedPendulumView,
	Controller,
	FunctionApproximator,
	SimpleAgent
);
