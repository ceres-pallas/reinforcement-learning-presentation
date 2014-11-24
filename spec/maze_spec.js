describe('Maze', function(){
	it('should exist', function(){
		expect(Maze).toBeDefined();
	});

	it('should be a function', function(){
		expect(typeof(Maze)).toBe('function');
	});

	describe('Construction', function(){
		var maze;

		beforeEach(function(){
			maze = new Maze();
		});

		describe('of Goals', function(){
			it('should accept a goal', function(){
				maze.addGoal(4, 3);

				var goals = maze.goals();

				expect(goals.length).toEqual(1);
				expect(goals[0]).toEqual([4, 3]);
			});

			it('should accept multiple goals', function(){
				maze.addGoal(4, 3);
				maze.addGoal(3, 4);

				var goals = maze.goals();

				expect(goals.length).toEqual(2);
				expect(goals[0]).toEqual([4, 3]);
				expect(goals[1]).toEqual([3, 4]);
			});

			it('should be able to set the reward', function(){
				maze.addGoal(4, 3, -5);

				var reward = maze.rewardFor([4, 3]);

				expect(reward).toEqual(-5);
			});
		});

		describe('of Obstructions', function(){
			it('should accept an obstruction', function(){
				maze.addObstruction(3,2);

				var obstructions = maze.obstructions();

				expect(obstructions.length).toEqual(1);
				expect(obstructions[0]).toEqual([3,2]);
			});

			it('should check a state for an obstruction', function() {
			    expect(maze.isObstructed([1, 0])).toBeFalsy();
			    maze.addObstruction(1,0);
			    expect(maze.isObstructed([1, 0])).toBeTruthy();
			});
		});
	});

	describe('State', function() {
	    var maze;

	    beforeEach(function(){
		maze = new Maze();
	    });

	    it('should have a state', function() {
		expect(maze.currentState()).toBeDefined();
	    });

	    it('should have a default state with an x and a y', function() {
		var currentState = maze.currentState();
		expect(currentState.x).toBe(0);
		expect(currentState.y).toBe(0);
	    });

	    it('should be able to adopt a new state', function() {
		maze.currentState({x:1, y:2});
		var currentState = maze.currentState();
		expect(currentState.x).toBe(1);
		expect(currentState.y).toBe(2);
	    });

	});

	describe('Actions', function() {
	    var maze;
	    beforeEach(function() {
		maze = new Maze();
	    });
	   
	    it('should have 4 possible actions', function() {
		var possibleActions = maze.getPossibleActions();
		expect(possibleActions.length).toBe(4);
	    });
	    
	    describe('Actiontypes', function() {
		it('should have up, down, left and right as possible actions', function() {
		    var possibleActions = maze.getPossibleActions();	
		    expect(possibleActions[0].action).toBe("up");
		    expect(possibleActions[1].action).toBe("right");
		    expect(possibleActions[2].action).toBe("down");
		    expect(possibleActions[3].action).toBe("left");
		});
	    });

	    describe('up', function() {
		it('should have a result state one y up', function() {
		    var possibleActions = maze.getPossibleActions();		    
		    expect(possibleActions[0].state).toEqual(new Position(0, 1));
		});

		it('should not have a possible action "up" if there is an obstruction above it', function() {
		    maze.addObstruction(0,1);
		    var possibleActions = maze.getPossibleActions();
		    expect(possibleActions).not.toContain({action: "up", state: new Position(0, 1)});
		});
	    });

	    describe('right', function() {
		it('should have a result state one x more', function() {
		    var possibleActions = maze.getPossibleActions();
		    
		    expect(possibleActions[1].state).toEqual(new Position(1, 0));
		});

		it('should not have a possible action "right" if there is an obstruction to the right of it', function() {
		    maze.addObstruction(1,0);
		    var possibleActions = maze.getPossibleActions();
		    expect(possibleActions).not.toContain({action: "right", state: new Position(1, 0)});
		});

	    });

	    describe('down', function() {
		it('should have a result state one y less', function() {
		    var possibleActions = maze.getPossibleActions();
		    
		    expect(possibleActions[2].state).toEqual(new Position(0, -1));	
		});

		it('should not have a possible action "down" if there is an obstruction to the right of it', function() {
		    maze.addObstruction(0,-1);
		    var possibleActions = maze.getPossibleActions();
		    expect(possibleActions).not.toContain({action: "down", state: new Position(0, -1)});
		});
	    });

	    describe('left', function() {
		it('should have a result state one x less', function() {
		    var possibleActions = maze.getPossibleActions();		
			expect(possibleActions[3].state).toEqual(new Position(-1, 0));
		    });
		});

		it('should not have a possible action "left" if there is an obstruction to the left of it', function() {
		    maze.addObstruction(-1,0);
		    var possibleActions = maze.getPossibleActions();

		    expect(possibleActions).not.toContain({action: "left", state: new Position(-1, 0)});
		});
	    });
	    it('should have 4-x possible actions where x is the amount of obstructions that surround it', function() {
		var maze = new Maze();
		maze.currentState({x: 4, y: 4});
		expect(maze.getPossibleActions().length).toBe(4);
		maze.addObstruction(3,4);
		expect(maze.getPossibleActions().length).toBe(3);
		maze.addObstruction(4,5);
		expect(maze.getPossibleActions().length).toBe(2);
		maze.addObstruction(4,3);
		expect(maze.getPossibleActions().length).toBe(1);
		maze.addObstruction(5,4);
		expect(maze.getPossibleActions().length).toBe(0);
	    });
            it('should adopt a new state if that action is performed', function() {
		var maze = new Maze();
		expect(maze.currentState()).toEqual(new Position(0,0));
		maze.tick(maze.getPossibleActions()[0])
		expect(maze.currentState()).toEqual(new Position(0,1));

	    });
            it('should know if a state is a goal state', function() {
		var maze = new Maze()
		maze.addGoal(1,1,1);
		expect(maze.isGoal([1,1])).toBeTruthy();
	    });
            it('should end if a state that is reached is a goal state', function() {
		var maze = new Maze();
		maze.addGoal(0, 1, -1);
		maze.tick(maze.getPossibleActions()[0]);
		expect(maze.ended).toBeTruthy();
	    });
    
    describe('should have reinforcement learning', function() {

	describe('FunctionApproximator', function() {
	    
	    it('should exist', function() {
		expect(FunctionApproximator).toBeDefined()
	    });

	});

	describe('SimpleAgent', function() {
	    
	    it('should exist', function() {
		expect(SimpleAgent).toBeDefined()
	    });
	    
	});

    });

    
});

describe('Helper functions', function() {
    it('should exist and be a function', function() {
	expect(Helper).toBeDefined();

    });

    describe('StateLoopRemover', function() {


	describe('should find the last occurence of a state in a stack', function() {
	    var stateStack;

	    beforeEach(function(){
		stateStack = [
		    { state: {x:1, y:1}}, 
		    { state: {x:2, y:1}},
		    { state: {x:1, y:1}},
		    { state: {x:2, y:2}},
		    { state: {x:1, y:1}},
		    { state: {x:2, y:2}}
		];
	    });
		
	    it('should return same index if it is the only occurence ', function() {
		expect(Helper.StateLoopRemover.findLastOccurence(stateStack, 1)).toBe(1);
	    });
	    it('should return the index of the last occurence ', function() {
		expect(Helper.StateLoopRemover.findLastOccurence(stateStack, 0)).toBe(4);
		expect(Helper.StateLoopRemover.findLastOccurence(stateStack, 3)).toBe(5);
	    }); 

	    it('should not trim if there is not loop', function() {
		expect(Helper.StateLoopRemover.removeLoop(stateStack, 1)).toEqual([
		    { state: {x:1, y:1}}, 
		    { state: {x:2, y:1}},
		    { state: {x:1, y:1}},
		    { state: {x:2, y:2}},
		    { state: {x:1, y:1}},
		    { state: {x:2, y:2}}
		]);
	    });

	    it('should trim everything between first occurence and last occurence ', function() {
		expect(Helper.StateLoopRemover.removeLoop(stateStack, 0)).toEqual([
		    { state: {x:1, y:1}},
		    { state: {x:2, y:2}}
		]);

		
	    });   
	});
    });
});



describe('MazeView', function(){
	var container;

	beforeEach(function(){
		container = document.createElement('div');
	});

	it('a container should be provided', function(){
		expect(container).toBeDefined();
	});

	it('should exist', function(){
		expect(MazeView).toBeDefined();
	});

	it('should be a function', function(){
		expect(typeof(MazeView)).toBe('function');
	});

	describe('creation of Canvas', function(){
		var maze;

		beforeEach(function(){
			maze = new Maze();

			maze.addGoal(3,2, 1);
			maze.addGoal(3,1, -1);

			maze.addObstruction(1,1);
		});

		it('should create a canvas', function(){
			new MazeView(maze, container, { width: 40, height: 30 });

			expect(container.getElementsByTagName('canvas').length).toBe(1);
		});

		it('should create a canvas of right dimensions', function(){
			new MazeView(maze, container, { width: 400, height: 300 });

			var canvas = container.getElementsByTagName('canvas')[0];

			expect(canvas.width).toBe(400);
			expect(canvas.height).toBe(300);

		});
	});

});
