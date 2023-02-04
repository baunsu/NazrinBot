const { roll } = require("./roll");

function stats() {
	let stats = [];
	const SIDES = 6;

	for (let i = 0; i <= 5; i++) {
		let rolls = roll(4, SIDES).sort(function (a, b) {
			return b - a;
		});
		rolls.pop();
		stats.push(rolls.reduce((accumulator, item) => accumulator + item));
	}

	return stats;
}

module.exports = { stats };
