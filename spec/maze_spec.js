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
