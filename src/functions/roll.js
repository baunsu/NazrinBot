function roll(num, sides) {
	let results = [];

	for (let i = 1; i <= num; i++) {
		let rolledVal = Math.floor(Math.random() * sides + 1);
		results.push(rolledVal);
	}

	return results;
}

module.exports = { roll };
