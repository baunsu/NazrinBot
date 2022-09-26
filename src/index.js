require('dotenv').config();
const TOKEN = process.env.TOKEN;
const { Client, GatewayIntentBits } = require('discord.js');

const { Guilds, GuildMessages, GuildMessageReactions } = GatewayIntentBits;
const client = new Client({
    intents: [
        Guilds,
        GuildMessages,
        GuildMessageReactions
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
    if (message.channelId === "448335060006076416") {
        message.react("<:upvote:806928734782881842>");
        message.react("<:downvote:806928697910493224>");
    }

});

client.login(TOKEN);