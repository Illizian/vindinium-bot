var _ = require('lodash');

/**
 * @module Board
 * @param {object} board A board object from a game state.
 */
module.exports = Board = function(board) {
	this.items = [];
	this.size  = board.size || 0;

	var row_length		= board.size*2;
	var row_splitter 	= new RegExp(".{1,"+row_length+"}","g");
	var rows 			= board.tiles.match(row_splitter);

	for(var x in rows) {
		if (rows.hasOwnProperty(x)) {
			var columns	= rows[x].match(/.{1,2}/g);
			this.items[x] = [];
			for(var y in columns) {
				if(columns.hasOwnProperty(y)) {
					this.items[x][y] = columns[y];
				}
			}
		}
	}

};

/**
 * @function findAt
 * @param {array} xy co-ordinates [x, y]
 * @return {string|null} A string representation of an entity
 */
Board.prototype.findAt = function(xy) {
	return (this.items[xy[0]]) ? this.items[xy[0]][xy[1]] || null : null;
};

/**
 * @function findAllAt
 * @param {array} xy An array of co-ordinates [[x, y], [x, y]]
 * @returns {array} An array with co-ordinates replaced with string representations of entities or null
 */
Board.prototype.findAllAt = function(xy) {
	return _.map(xy, this.findAt.bind(this));
};

/**
 * @function printMap
 * @returns {void} Prints map to stdout
 */
Board.prototype.printMap = function() {
	var map = '';
	for(var x = 0; x < this.size; x++) {
		map += this.items[x].join('') + '\n';
	}
	console.log(map);
};

/**
 * @function distanceBetween
 * @param {array} a The co-ordinates of A
 * @param {array} b The co-ordinates of B
 * @returns {integer|null} The distance (as the crow flies) between 2 co-ordinates
 */
Board.prototype.distanceBetween = function(a, b) {
	if(	!_.isNumber(a[0])||
		!_.isNumber(a[1])||
		!_.isNumber(b[0])||
		!_.isNumber(b[1])) { return null; }
	return Math.abs(b[0]-a[0])+Math.abs(b[1]-a[1]);
};

/**
 * @function findClosest
 * @param {array} xy The co-ordinates [x, y]
 * @param {string} entity A string representation of an entity
 * @returns {array|null} Return co-ordinates [x, y] of the closest entity to xy
 */
Board.prototype.findClosest = function(xy, entity) {
	for(var x = 0; x <= this.size; x++) {
		var neighbours	= this.findNeighbours(xy, x);
		var entities	= this.findAllAt(neighbours);
		var index		= _.indexOf(entities, entity);

		if(index !== -1) { return neighbours[index]; }
		if(x === this.size) { return null; }
	}
};

/**
 * @function findNeighbours
 * @param {array} xy - co-ordinates [x, y]
 * @param {integer} steps - How many steps away
 * @returns {array} An array neighbours of co-ordinates at `steps` away
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