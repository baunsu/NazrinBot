const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription("Rolls dice")
		.addNumberOption((option) =>
			option
				.setName("num")
				.setDescription("The number of dice.")
				.setRequired(true)
		)
		.addNumberOption((option) =>
			option
				.setName("sides")
				.setDescription(
					"The number of sides on the die. Must be between -1 and 1001."
				)
				.setRequired(true)
		)
		.addNumberOption((option) =>
			option
				.setName("mod")
				.setDescription("Modifer for roll.")
				.setRequired(false)
		),
	async execute(interaction) {
		const SIDES = interaction.options.getNumber("sides");
		const NUM = interaction.options.getNumber("num");
		let mod = 0;

		if (interaction.options.getNumber("mod") != null) {
			mod = interaction.options.getNumber("mod");
		}

		if (SIDES <= 0 || SIDES >= 1000)
			await interaction.reply(`**${SIDES} is not valid.`);

		let results = [];

		for (let i = 1; i <= NUM; i++) {
			let rolledVal = Math.floor(Math.random() * SIDES + 1);
			results.push(rolledVal);
		}

		let finalVal =
			results.reduce((accumulator, item) => accumulator + item) +
			mod * NUM;

		await interaction.reply(
			`Rolling: **${NUM}d${SIDES}**\n` +
				`Results: **${results}**\n` +
				`Total (modifier ${mod}): ${finalVal}`
		);
	},
};
