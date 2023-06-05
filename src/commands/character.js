const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { health } = require("../functions/health");
const fs = require("fs");
const path = require("path");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("character")
		.setDescription("Makes a single classed character for inputted level.")
		.addStringOption((option) =>
			option
				.setName("class")
				.setDescription("The class's name.")
				.setRequired(true)
				.addChoices(
					{ name: "Barbarian", value: "barbarian" },
					{ name: "Bard", value: "bard" },
					{ name: "Cleric", value: "cleric" },
					{ name: "Druid", value: "druid" },
					{ name: "Fighter", value: "fighter" },
					{ name: "Monk", value: "monk" },
					{ name: "Paladin", value: "paladin" },
					{ name: "Ranger", value: "ranger" },
					{ name: "Rogue", value: "rogue" },
					{ name: "Sorcerer", value: "sorcerer" },
					{ name: "Warlock", value: "warlock" },
					{ name: "Wizard", value: "wizard" }
				)
		)
		.addNumberOption((option) =>
			option
				.setName("level")
				.setDescription("Level of character.")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("race")
				.setDescription("Character race.")
				.setRequired(true)
				.addChoices(
					{ name: "Human", value: "human" },
					{ name: "Dwarf", value: "dwarf" }
				)
		)
		.addStringOption((option) =>
			option
				.setName("alignment")
				.setDescription("Character alignment.")
				.setRequired(true)
				.addChoices(
					{ name: "Lawful Good", value: "lg" },
					{ name: "Lawful Neutral", value: "ln" },
					{ name: "Lawful  Evil", value: "le" },
					{ name: "Neutral Good", value: "ng" },
					{ name: "Neutral", value: "n" },
					{ name: "Neutral Evil", value: "ne" },
					{ name: "Chaotic Good", value: "cg" },
					{ name: "Chaotic Neutral", value: "cn" },
					{ name: "Chaotic Evil", value: "ce Good" }
				)
		),
	async execute(interaction) {
		let charClass = interaction.options.getString("class");
		const LEVEL = interaction.options.getNumber("level");
		let charRace = interaction.options.getString("race");
		const ALIGNMENT = interaction.options
			.getString("alignment")
			.toUpperCase();
		const color = interaction.member.displayHexColor;

		let classes = path.join(__dirname, "..\\data\\classes.json");
		let classData = JSON.parse(fs.readFileSync(classes).toString());

		charClass = charClass.replace(
			charClass.charAt(),
			charClass.charAt(0).toUpperCase()
		);
		charRace = charRace.replace(
			charRace.charAt(),
			charRace.charAt(0).toUpperCase()
		);

		const userInfo = new EmbedBuilder()
			.setColor(color)
			.setTitle(`Character Sheet`)
			.setFields(
				{ name: `Class`, value: `${charClass}`, inline: true },
				{ name: `Level`, value: `${LEVEL}`, inline: true },
				{ name: `Race`, value: `${charRace}`, inline: true },
				{ name: `Alignment`, value: `${ALIGNMENT}`, inline: true },
				{
					name: `Player`,
					value: `${interaction.user.tag}`,
					inline: true,
				},
				{ name: `Experience`, value: `${300}`, inline: true }
			);

		let currClass = classData[charClass];

		currClass.forEach((el, i) => {
			let lvl = i + 1;
			let data = JSON.stringify(el[lvl]);
			data = data.slice(1, -1);

			if (lvl <= LEVEL) {
				userInfo.addFields({
					name: `Level ${lvl} Feature(s)`,
					value: `${data}`,
					inline: true,
				});
			}
		});

		await interaction.reply({ embeds: [userInfo] });
	},
};
