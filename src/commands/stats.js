const { SlashCommandBuilder } = require("discord.js");
const { stats } = require("../functions/stats");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("stats")
		.setDescription(
			"rolls for stats using 4d6, dropping the lowest roll of the 4."
		),
	async execute(interaction) {
		let playerStats = stats();

		let defaultReply = `Rolled for stats: **${playerStats}**`;

		await interaction.reply(defaultReply);
	},
};
