// Board.tests.js
var expect = require('chai').expect;

var instruments = require('./instruments');
var ai = require('../lib');

describe("Intel Class", function() {

	var intel = new ai.Intel(instruments.state[0].hero, instruments.state[0].game);

	it("should have the correct entity count", function() {
		expect(intel.entityCount.path).to.equal(232);
		expect(intel.entityCount.wood).to.equal(212);
		expect(intel.entityCount.hero).to.equal(4);
		expect(intel.entityCount.tavern).to.equal(4);
		expect(intel.entityCount.mine).to.equal(32);
		expect(intel.entityCount.mine_claimed).to.equal(1);
		expect(intel.entityCount.mine_unclaimed).to.equal(31);
	});

	it("should have the correct stats", function() {
		expect(intel.progress).to.equal(0.02666666666666667);
		expect(intel.health).to.equal(0.92);
		expect(intel.mineProliferation).to.equal(0);
	});

});