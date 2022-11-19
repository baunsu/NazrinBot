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

		let welcomeChannels = path.join(__dirname, "welcome-channels.json");
		let data = JSON.parse(fs.readFileSync(welcomeChannels).toString());

		let addedChannel = false;
		let sameGuild = false;
		data.channels.map((element) => {
			if (element.currentChannel == currentChannel) {
				addedChannel = true;
			}
			if (element.currentGuild == currentGuild) {
				sameGuild = true;
			}
		});

		const addChannel = () => {
			let welcomeChannel = { currentGuild, currentChannel };
			data.channels.push(welcomeChannel);

			fs.writeFileSync(welcomeChannels, JSON.stringify(data));
		};

		if (addedChannel) {
			await interaction.reply(`<#${currentChannel}> is already set!`);
			return;
		} else {
			if (sameGuild) {
				let pos = -1;
				data.channels.map((element) => {
					if (element.currentGuild == currentGuild) {
						pos = data.channels.indexOf(element);
					}
				});
				data.channels.splice(pos, pos + 1);
			}

			addChannel();
			await interaction.reply(
				"Current welcome channel:\n" + `<#${currentChannel}>`
			);
		}
	},
};
