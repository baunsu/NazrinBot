require('dotenv').config();
const TOKEN = process.env.TOKEN;
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const { Guilds, GuildMessages, GuildMessageReactions, MessageContent } = GatewayIntentBits;
const client = new Client({
    intents: [
        Guilds,
        GuildMessages,
        GuildMessageReactions,
        MessageContent
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if(message.author.bot) return; 

    if (message.author.id === "328927740617031691") {
        message.react("<:lolicon:1022021897157869588>");
    }
    const validExtensins = [".png", ".jpg", ".mp4", ".mov", ".webm"];
    const memeChannals = ["876810952039878728", "950912874266652702", "950912897335328848", "448335060006076416"];
    
    memeChannals.forEach(channel => {
        if (message.channelId === channel) {
            validExtensins.forEach(extension => {
                if (message.attachments.size > 0 || message.content.endsWith(extension)) {
                    message.react("<:upvote:806928734782881842>");
                    message.react("<:downvote:806928697910493224>");
                }
            })
        }
    })
});

client.login(TOKEN);