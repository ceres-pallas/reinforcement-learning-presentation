/* global Maze, FunctionApproximator, SimpleAgent, Helper, Position*/
(function(Maze, FunctionApproximator, SimpleAgent, Helper){
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
    
    var agent = new SimpleAgent(problem, functionApproximator);
  
    //order of choices 
    var order = [
	{state: new Position(0, 1), action: 'up'}, 
	{state: new Position(0, 2), action: 'up'}, 
	{state: new Position(1, 2), action: 'right'}, 
	{state: new Position(2, 2), action: 'right'},
	{state: new Position(3, 2), action: 'right'},
    ];
    order = [
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

    function run(){
	if(!problem.ended) {
	    var option = agent.chooseAction();

	    agent.performAction(option);
	    run();
	} else {

	    var g = 0;
	    while(g < agent.history.length - 1) {
		agent.history = Helper.StateLoopRemover.removeLoop(agent.history, g);
		g++;
	    }
	    agent.reevaluateActions(problem.rewardFor([problem.currentState().x, problem.currentState().y]), 0.04);
	}	
    }


    var count = 0;
    while(count < 3) {
	problem.ended = false;
	problem.currentState({x:0, y:0});
    	count++;
	var row;
	for(var i = 2; i>=0; i--) {
	    row  = '[' + agent.solver.getValue({x:0,y:i}) + ' ' + agent.problem.rewardFor([0,i]) + ']';
	    row += '[' + agent.solver.getValue({x:1,y:i}) + ' ' + agent.problem.rewardFor([1,i]) + ']';
	    row += '[' + agent.solver.getValue({x:2,y:i}) + ' ' + agent.problem.rewardFor([2,i]) + ']';
	    row += '[' + agent.solver.getValue({x:3,y:i}) + ' ' + agent.problem.rewardFor([3,i]) + ']';
	}

	run();
    }

})(Maze, FunctionApproximator, SimpleAgent, Helper);
