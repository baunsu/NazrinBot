const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info!'),
	async execute(interaction) {
		const userCreated = interaction.user.createdAt.toLocaleString('en', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		})
		const userJoined = interaction.member.joinedAt.toLocaleString('en', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		})
		const color = interaction.member.displayHexColor;
		const userRoles = interaction.member.roles.cache;
		// const userPerms = interaction.member.PermissionsBitField.flags;
		
		const userInfo = new EmbedBuilder()
			.setColor(color)
			.setTitle(`User Info`)
			.setThumbnail(`${interaction.user.avatarURL()}`)
			.setFields(
				{ name: `Username`, value: `${interaction.user.tag}`, inline: true},
				{ name: `Created On`, value: `${userCreated}`, inline: true},
				{ name: `Joined On`, value: `${userJoined}`, inline: true},
				{ name: `Roles`, value: `${userRoles.map(item => item)}` }
			)
		await interaction.reply({embeds: [userInfo]});
	},
};