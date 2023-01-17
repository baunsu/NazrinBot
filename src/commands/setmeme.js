const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setmeme")
		.setDescription("Sets meme channel")
		.setDefaultMemberPermissions(0),
	async execute(interaction) {
		const currentChannel = interaction.channelId;

		let memeChannels = path.join(__dirname, "..\\data\\meme-channels.json");
		let memeData = JSON.parse(fs.readFileSync(memeChannels).toString());

		let addedChannel = false;
		
		memeData.channels.map((element) => {
			if (element.currentChannel == currentChannel) {
				addedChannel = true;
			}
		});

		const addChannel = () => {
			let memeChannel = { currentChannel };
			memeData.channels.push(memeChannel);

			fs.writeFileSync(memeChannels, JSON.stringify(memeData));
		};

		if (addedChannel) {
			await interaction.reply(`<#${currentChannel}> is already set!`);
			return;
		} else {
			addChannel();
			await interaction.reply(
				"Set meme channel:\n" + `<#${currentChannel}>`
			);
		}
	},
};
