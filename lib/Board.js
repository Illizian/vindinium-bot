var _ = require('lodash');

module.exports = Board = function(board) {
	this.items = [];
	this.size  = 0;

	// Constructor
	var __construct = function(self) {
		var row_length		= board.size*2;
		var row_splitter 	= new RegExp(".{1,"+row_length+"}","g");
		var rows 			= board.tiles.match(row_splitter);

		self.size = board.size;

		for(var x in rows) {
			var columns	= rows[x].match(/.{1,2}/g);
			self.items[x] = [];
			for(var y in columns) {
				self.items[x][y] = columns[y];
			}
		}
	}(this);
};

/**
 * Board#findAt(xy)
 * - Returns the string representation at x, y
 * 	xy [array(2)]
 * returns str or null
 */
Board.prototype.findAt = function(xy) {
	return (this.items[xy[0]]) ? this.items[xy[0]][xy[1]] || null : null;
};

/**
 * Board#findAllAt(xy)
 * - Returns the string representation for multiple x, y
 * 	xy [[array(2)], [array(2)]]
 * returns array of str or null
 */
Board.prototype.findAllAt = function(xy) {
	return _.map(xy, this.findAt.bind(this));
};

/**
 * Board#printMap()
 * - Prints map to stdout
 */
Board.prototype.printMap = function() {
	var map = '';
	for(var x = 0; x < this.size; x++) {
		map += this.items[x].join('') + '\n';
	}
	console.log(map);
};

/**
 * Board#distanceBetween(a, b)
 * 	a [array(2)]
 * 	b [array(2)]
 * returns int or Error
 */
Board.prototype.distanceBetween = function(a, b) {
	if(	!_.isNumber(a[0])||
		!_.isNumber(a[1])||
		!_.isNumber(b[0])||
		!_.isNumber(b[1])) return null;
	return Math.abs(b[0]-a[0])+Math.abs(b[1]-a[1]);
};

/**
 * Board#findClosest(xy, entity)
 * - find closest entity (e.g. '[]' tavern) to xy
 *  xy [array(2)]
 *  entity [string]
 * returns [array(2)]
 */
Board.prototype.findClosest = function(xy, entity) {
	for(var x = 0; x <= this.size; x++) {
		var neighbours	= this.findNeighbours(xy, x);
		var entities	= this.findAllAt(neighbours);
		var index		= _.indexOf(entities, entity);

		if(index !== -1) return neighbours[index];
		if(x === this.size) return null;
	}
};

/**
 * Board#findNeighbours(xy, steps)
 * 	xy [array(2)]
 *  steps [int]
 * returns [array]
 */
Board.prototype.findNeighbours = function(xy, steps) {
	var curA = [xy[0]-steps,xy[1]];
	var curB = [xy[0],xy[1]+steps];
	var curC = [xy[0]+steps,xy[1]];
	var curD = [xy[0],xy[1]-steps];
	var arrA = [];
	var arrB = [];
	var arrC = [];
	var arrD = [];

	for(var x = 0; x < steps; x++) {
		arrA.push([curA[0]++, curA[1]++]);
		arrB.push([curB[0]++, curB[1]--]);
		arrC.push([curC[0]--, curC[1]--]);
		arrD.push([curD[0]--, curD[1]++]);
	}
	return arrA.concat(arrB, arrC, arrD);
};