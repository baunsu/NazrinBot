const data = require("../data/meme-channels.json");

module.exports = {
	name: "messageCreate",
	execute(message) {
		const botId = 1023800611889741824;

		if (message.author.bot) return;

		let memeChannels = data.channels.map((item) => {
			return item.currentChannel;
		});

		// if (message.author.id === "328927740617031691") {
		// 	message.react("1052898566911299674");
		// }
		// if (message.author.id === "186588469164900352") {
		// 	message.react("1029256965890789426");
		// }

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
			message.channel.send(`<@${message.author.id}>, 😉`);
		}
	},
};
