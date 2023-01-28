const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("stats")
		.setDescription(
			"rolls for stats using 4d6, dropping the lowest roll of the 4."
		),
	async execute(interaction) {
		let stats = [];
		const SIDES = 6;

		const roll = () => {
			let rolls = [];
			for (let i = 0; i <= 3; i++) {
				let rolledVal = Math.floor(Math.random() * SIDES + 1);
				rolls.push(rolledVal);
			}
			adds(rolls);
		};

		const adds = (arr) => {
			arr.sort(function (a, b) {
				return b - a;
			});
			arr.pop();
			stats.push(arr.reduce((accumulator, item) => accumulator + item));
		};

		for (let i = 0; i <= 5; i++) {
			roll();
		}

		let defaultReply = `Rolled for stats: **${stats}**`;

		await interaction.reply(defaultReply);
	},
};
