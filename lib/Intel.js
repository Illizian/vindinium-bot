var math = require('mathjs');
var _ = require('lodash');
var entities = require('./data/entities.json');

/**
 * @module Intel
 * @param {object} hero The hero object from a game state.
 * @param {object} hero The game object from a game state.
 */
module.exports = Intel = function(hero, game) {

	this.entityCount = _.mapValues(entities, function(entity) {
		return game.board.tiles.match(new RegExp(entity.pattern, "g")).length;
	});

	this.progress	 		= math.divide(game.turn, game.maxTurns);
	this.health		 		= math.divide(hero.life, 100);
	this.mineProliferation	= math.divide(hero.mineCount, this.entityCount.mine_claimed);

};