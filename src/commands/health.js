const { SlashCommandBuilder } = require("discord.js");
const { health } = require("../functions/health");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("health")
		.setDescription(
			"Rolls for initial health. Does not support multipclassing."
		)
		.addNumberOption((option) =>
			option
				.setName("hitdie")
				.setDescription("The class's hit die.")
				.setRequired(true)
		)
		.addNumberOption((option) =>
			option
				.setName("level")
				.setDescription("Level of character.")
				.setRequired(true)
		)
		.addNumberOption((option) =>
			option
				.setName("con")
				.setDescription("Constitution of character.")
				.setRequired(true)
		),
	async execute(interaction) {
		const HITDIE = interaction.options.getNumber("hitdie");
		const LEVEL = interaction.options.getNumber("level");
		const CON = interaction.options.getNumber("con");

		let hp = health(HITDIE, LEVEL, CON);

		await interaction.reply(`Total HP (Con ${CON}): **${hp}**`);
	},
};
