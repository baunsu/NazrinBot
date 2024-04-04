const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pick")
		.setDescription("Picks a random option from the provided list.")
		.addStringOption((option) =>
			option
				.setName("choices")
				.setDescription(
					"The options to choose from, seperate by space."
				)
				.setRequired(true)
		),
	async execute(interaction) {
		const CHOICES = interaction.options.getString("choices");

		let list_of_items = CHOICES.split(" ");

		await interaction.reply(
			`Picked: **${
				list_of_items[Math.floor(Math.random() * list_of_items.length)]
			}**`
		);
	},
};
