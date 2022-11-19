const { GuildMember } = require("discord.js");
const data = require("..\\data\\welcome-channels.json");

module.exports = {
	name: "guildMemberAdd",
	execute(member) {
		let welcome = data.channels.filter((item) => {
			if (member.guild.id == item.currentGuild) {
				return item.currentGuild;
			}
		});
		const welcomeChan = member.guild.channels.cache.get(
			welcome[0].currentChannel
		);

		const welcomeMessage = `<@${member.id}> has joined ${member.guild.name}!`;

		welcomeChan.send({ content: welcomeMessage });
	},
};
// AxzhPrFs
