const data = require("../data/meme-channels.json");

module.exports = {
	name: "messageCreate",
	execute(message) {
		const botId = 1023800611889741824;

		if (message.author.bot) return;

		let memeChannels = data.channels.map((item) => {
			return item.currentChannel;
		});

		const validExtensins = [".png", ".jpg", ".mp4", ".mov", ".webm"];

		memeChannels.forEach((channel) => {
			if (message.channelId == channel) {
				validExtensins.forEach((extension) => {
					if (
						message.attachments.size > 0 ||
						message.content.endsWith(extension)
					) {
						message.react("<:upvote:1029256925340254218>");
						message.react("<:downvote:1029256965890789426> ");
					}
				});
			}
		});
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
