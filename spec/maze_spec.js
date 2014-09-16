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
