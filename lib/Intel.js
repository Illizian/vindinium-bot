var math = require('mathjs');

/**
 * @module Intel
 * @param {object} hero The hero object from a game state.
 * @param {object} hero The game object from a game state.
 */
module.exports = Intel = function(hero, game) {

	this.entityCount = {
		"path": game.board.tiles.match(/\s{2}/g).length,
		"wood": game.board.tiles.match(/[#]{2}/g).length,
		"hero": game.board.tiles.match(/[@]\d/g).length,
		"tavern": game.board.tiles.match(/\[\]/g).length,
		"mine": game.board.tiles.match(/\$(\d|-)/g).length,
		"mine_claimed": game.board.tiles.match(/\$\d/g).length,
	 	"mine_unclaimed": game.board.tiles.match(/\$\-/g).length
	};

	this.progress	 		= math.divide(game.turn, game.maxTurns);
	this.health		 		= math.divide(hero.life, 100);
	this.mineProliferation	= math.divide(hero.mineCount, this.entityCount.mine_claimed);

};