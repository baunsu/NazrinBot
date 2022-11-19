const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setwelcome")
		.setDescription("Sets welcome channel"),
	async execute(interaction) {
		let currentChannel = interaction.channelId;
		let currentGuild = interaction.guildId;

		let welcomeChannels = path.join(
			__dirname,
			"..\\data\\welcome-channels.json"
		);
		let welcomeData = JSON.parse(
			fs.readFileSync(welcomeChannels).toString()
		);

		let addedChannel = false;
		let sameGuild = false;
		welcomeData.channels.map((element) => {
			if (element.currentChannel == currentChannel) {
				addedChannel = true;
			}
			if (element.currentGuild == currentGuild) {
				sameGuild = true;
			}
		});

		const addChannel = () => {
			let welcomeChannel = { currentGuild, currentChannel };
			welcomeData.channels.push(welcomeChannel);

			fs.writeFileSync(welcomeChannels, JSON.stringify(welcomeData));
		};

		if (addedChannel) {
			await interaction.reply(`<#${currentChannel}> is already set!`);
			return;
		} else {
			if (sameGuild) {
				let pos = -1;
				welcomeData.channels.map((element) => {
					if (element.currentGuild == currentGuild) {
						pos = welcomeData.channels.indexOf(element);
					}
				});
				welcomeData.channels.splice(pos, pos + 1);
			}

			addChannel();
			await interaction.reply(
				"Current welcome channel:\n" + `<#${currentChannel}>`
			);
		}
	},
};
