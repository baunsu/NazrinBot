module.exports = {
	name: "messageCreate",
	execute(message) {
		const botId = 1023800611889741824;

		if (message.author.bot) return;

		const validExtensins = [".png", ".jpg", ".mp4", ".mov", ".webm"];

		if (message.mentions.has(message.client.user.id)) {
			let die =
				message.content.toLowerCase().includes("kys") ||
				message.content.toLowerCase().includes("kill yourself") ||
				message.content.toLowerCase().includes("die");

			if (die) {
				message.channel.send(`<@${message.author.id}>, :(`);
			} else {
				message.channel.send(
					`<@${message.author.id}>, cheesed to see you!`
				);
			}
		}
	},
};
