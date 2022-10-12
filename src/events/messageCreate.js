module.exports = {
	name: 'messageCreate',
	execute(message) {
		if(message.author.bot) return; 

        // if (message.author.id === "328927740617031691") {
        //     message.react("1029256527254650942");
        // }
        const validExtensins = [".png", ".jpg", ".mp4", ".mov", ".webm"];
        const memeChannals = ["876810952039878728", "950912874266652702", "950912897335328848", "448335060006076416"];
        
        memeChannals.forEach(channel => {
            if (message.channelId === channel) {
                validExtensins.forEach(extension => {
                    if (message.attachments.size > 0 || message.content.endsWith(extension)) {
                        message.react("<:upvote:1029256925340254218>");
                        message.react("<:downvote:1029256965890789426> ");
                    }
                })
            }
        })
	},
};