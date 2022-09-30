require('dotenv').config();
const TOKEN = process.env.TOKEN;
const fs = require('node:fs');
const path = require('node:path');
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

client.commands = new Collection();
const commandPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(commandPath);
    client.commands.set(command.data.name, command);
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;
    
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });  
    }
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