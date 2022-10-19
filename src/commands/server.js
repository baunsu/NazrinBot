const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info!'),
	async execute(interaction) {
		const owner = await interaction.guild.fetchOwner();
		const rolesInServ = await interaction.guild.roles.fetch();
		const createDate = interaction.guild.createdAt.toLocaleString('en', {
			month: 'numeric',
			day: 'numeric',
			year: 'numeric'
		});

		const serverInfo = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(`${interaction.guild.name}`)
			.setThumbnail(`${interaction.guild.iconURL()}`)
			.addFields(
				{ name: `Server Owner`, value: `${owner}`, inline: true},
				{ name: 'Member Count', value: `${interaction.guild.memberCount}`, inline:true},
				{ name: `Role Count`, value:`${rolesInServ.size}`, inline: true}
			)
			.addFields(
				{ name: `Roles`, value: `${rolesInServ.filter(role => role.name != '@everyone')
				.map(item => {
					return " " + item.name;
				})}`}
			)
			.setFooter({ text: `Server created on ${createDate}`, iconURL: `${interaction.guild.iconURL()}`})
		await interaction.reply({embeds: [serverInfo]});
	},
};