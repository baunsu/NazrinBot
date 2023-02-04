const { roll } = require("./roll");

function health(hitdie, level, con) {
	let hp = hitdie + con;
	let finalVal = 0;

	let results = roll(level - 1, hitdie);

	if (results.length > 0) {
		finalVal = results.reduce(
			(accumulator, item) => accumulator + item + con
		);
	}

	return finalVal + hp;
}

module.exports = { health };
