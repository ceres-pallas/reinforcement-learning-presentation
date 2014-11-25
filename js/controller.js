/* global Maze, FunctionApproximator, SimpleAgent, console*/
(function(Maze, FunctionApproximator, SimpleAgent){
    'use strict';
    
    var problem = new Maze();
    problem.addGoal(3,2,1);
    problem.addGoal(3,1,-1);
    problem.addObstruction(1,1);
    
    problem.addObstruction(-1,0);
    problem.addObstruction(-1,1);
    problem.addObstruction(-1,2);
    
    problem.addObstruction(4,0);
    problem.addObstruction(4,1);
    problem.addObstruction(4,2);

    problem.addObstruction(0,-1);
    problem.addObstruction(1,-1);
    problem.addObstruction(2,-1);
    problem.addObstruction(3,-1);

    problem.addObstruction(0,3);
    problem.addObstruction(1,3);
    problem.addObstruction(2,3);
    problem.addObstruction(3,3);

    var functionApproximator = new FunctionApproximator(
	Math.random,
	0.01,
	0.1,
	function(elements) { return elements[Math.floor((Math.random() * elements.length))]; },
	function(weights) {
	    return 1/weights.reduce(function (prev, current) { 
		return Math.max(prev, current);}, -Infinity);
	}
    );

    functionApproximator.addValueFunction(
	functionApproximator.createValueFunction(function() {
	    return 1;
	})
    );

    functionApproximator.addValueFunction(
	functionApproximator.createValueFunction(function(s) {
	    return s.x;
	})
    );

    functionApproximator.addValueFunction(
	functionApproximator.createValueFunction(function(s) {
	    return s.y;
	})
    );    
    var agent = new SimpleAgent(problem, functionApproximator);
  
    function run(){
	if(!problem.ended) {
	    var option = agent.chooseAction();

	    agent.performAction(option);
	    run();
	} else {
	    agent.performAction({state: problem.currentState(), action: 'end'});



	    agent.reevaluateActions(problem.rewardFor([problem.currentState().x, problem.currentState().y]), 0.04);

	    var row;
	    for(var i = 0; i<3; i++) {
		row  = '[' + agent.solver.getValue({x:0,y:i}) + ']';
		row += '[' + agent.solver.getValue({x:1,y:i}) + ']';
		row += '[' + agent.solver.getValue({x:2,y:i}) + ']';
		row += '[' + agent.solver.getValue({x:3,y:i}) + ']';
		console.log(row);
	    }
	    var log = '';
	    agent.solver.getValueFunctions().forEach(function(el) { log += ' ' +  el.getWeight(); } );
	}	
    }

    var count = 0;
    while(count < 20) {
	problem.ended = false;
	problem.currentState({x:0, y:0});
    	count++;
	console.log("log");
	run();
    }

})(Maze, FunctionApproximator, SimpleAgent);
