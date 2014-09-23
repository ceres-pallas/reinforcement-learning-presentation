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
		    
		    expect(possibleActions[0].state).toEqual({x:0, y:1});
		});
	    });

	    describe('right', function() {
		it('should have a result state one x more', function() {
		    var possibleActions = maze.getPossibleActions();
		    
		    expect(possibleActions[1].state).toEqual({x:1, y:0});
		});
	    });

	    describe('down', function() {
		it('should have a result state one y less', function() {
		    var possibleActions = maze.getPossibleActions();
		    
		    expect(possibleActions[2].state).toEqual({x:0, y:-1});	
		});
	    });

	    describe('left', function() {
		it('should have a result state one x less', function() {
		    var possibleActions = maze.getPossibleActions();
		
			expect(possibleActions[3].state).toEqual({x:-1, y:0});
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
