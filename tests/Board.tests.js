var expect = require('chai').expect;
// require('mocha-sinon');
var sinon = require('sinon');

var instruments = require('./instruments').maps;
var ai = require('../lib');

describe("Board Class", function() {

	describe("findAt()", function() {

		var map_0 = new ai.Board(instruments[0]);

		it("should return '@1' from 1,6", function() {
			expect(map_0.findAt([1,6])).to.equal("@1");
		});

		it("should return '  ' from 5,5", function() {
			expect(map_0.findAt([5,5])).to.equal("  ");
		});

		it("should return '$-' from 2,8", function() {
			expect(map_0.findAt([2,8])).to.equal("$-");
		});

		it("should return '$4' from 2,13", function() {
			expect(map_0.findAt([2,13])).to.equal("$4");
		});

		it("should return '##' from 1,8", function() {
			expect(map_0.findAt([1,8])).to.equal("##");
		});

		it("should return null if xy array is incorrect", function() {
			expect(map_0.findAt([undefined, 1])).to.equal(null);
			expect(map_0.findAt([1, undefined])).to.equal(null);
			expect(map_0.findAt([])).to.equal(null);
		});

	});

	describe("printMap()", function() {
		var map_0 = new ai.Board(instruments[0]);

		it("Should print the map to STDOUT in a human readable format", sinon.test(function() {
			this.stub(console, 'log');
			map_0.printMap();
			expect(console.log.callCount).to.equal(1);
			expect(console.log.calledWith(
				'####    ####    ############    ####    ####\n'+
				'####$-    ##@1  ############    ##    $-####\n'+
				'######  ##      $-########$4@4    ##  ######\n'+
				'####$-  ####  []####    ####[]  ####  $-####\n'+
				'####$-  ##                        ##  $-####\n'+
				'######  ##  ##      ####      ##  ##  ######\n'+
				'####      $-      ##    ##      $-      ####\n'+
				'##$-                                    $-##\n'+
				'##            $-############$-            ##\n'+
				'    $-##    ####################    ##$-    \n'+
				'    ##        ################        ##    \n'+
				'    ##        ################        ##    \n'+
				'    $-##    ####################    ##$-    \n'+
				'##            $-############$-            ##\n'+
				'##$-                                    $-##\n'+
				'####      $-      ##    ##      $-      ####\n'+
				'######  ##  ##      ####      ##  ##  ######\n'+
				'####$-  ##                        ##  $-####\n'+
				'####$-  ####  []####    ####[]  ####  $-####\n'+
				'######  ##  @2  $-########$-  @3  ##  ######\n'+
				'####$-    ##    ############    ##    $-####\n'+
				'####    ####    ############    ####    ####'
			));
		}));

	});

	describe("distanceBetween()", function() {

		var map_0 = new ai.Board(instruments[0]);

		it("5,5 & 2,8 should return 6", function() {
			expect(map_0.distanceBetween([5,5], [2,8])).to.equal(6);
		});

		it("1,0 & 3,0 should return 2", function() {
			expect(map_0.distanceBetween([1,0], [3,0])).to.equal(2);
		});

		it("4,0 & 1,2 should return 2", function() {
			expect(map_0.distanceBetween([4,0], [1,2])).to.equal(5);
		});

		it("should return null if either xy array is incorrect", function() {
			expect(map_0.distanceBetween([undefined, 1], [undefined, 1])).to.equal(null);
			expect(map_0.distanceBetween([1, undefined], [1, undefined])).to.equal(null);
			expect(map_0.distanceBetween([], [])).to.equal(null);
		});

	});

	describe("findClosest()", function() {

		var map_0 = new ai.Board(instruments[0]);

		it("'**' (invalid) to 1,6 should return null", function() {
			expect(map_0.findClosest([1,6], '**')).to.equal(null);
		});

		it("'$-' to 1,6 should return 2,8", function() {
			expect(map_0.findClosest([1,6], '$-')).to.have.members([2,8]);
		});

		it("'[]' to 1,6 should return 3,7", function() {
			expect(map_0.findClosest([1,6], '[]')).to.have.members([3,7]);
		});

	});

	describe("findNeighbours()", function() {

		var map_0 = new ai.Board(instruments[0]);

		it("to 1,6 at 1 step should return correct coordinates", function() {
			var neighbours = map_0.findNeighbours([1,6],1);

			expect(neighbours.length).to.equal(4);
			expect(neighbours).to.have.deep.members([[0,6], [1,7], [2,6], [1,5]]);
		});

		it("to 0,0 at 1 step should return correct coordinates", function() {
			var neighbours = map_0.findNeighbours([0,0],1);

			expect(neighbours.length).to.equal(4);
			expect(neighbours).to.have.deep.members([[-1,0], [0,1], [1,0], [0,-1]]);
		});


		it("to 0,0 at 2 step should return correct coordinates", function() {
			var neighbours = map_0.findNeighbours([0,0],2);

			expect(neighbours.length).to.equal(8);
			expect(neighbours).to.have.deep.members([[-2,0], [-1,1], [0,2], [1,1], [2,0], [1,-1], [0,-2], [-1,-1]]);
		});


		it("to 0,0 at 3 step should return correct coordinates", function() {
			var neighbours = map_0.findNeighbours([0,0],3);

			expect(neighbours.length).to.equal(12);
			expect(neighbours).to.have.deep.members([[-3,0], [-2,1], [-1,2], [0,3], [1,2], [2,1], [3,0], [2,-1], [1,-2], [0,-3], [-1,-2], [-2,-1]]);
		});

	});
});