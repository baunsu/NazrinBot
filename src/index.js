const { config } = require('dotenv') ;
const { Client, GatewayIntentBits, Collection, Guild, Routes } = require('discord.js');
const fs = require('node:fs') ;
const path = require('node:path') ;
// const { fileURLToPath } = require('node:url');

config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.BOT_CLIENT_ID;
const GUILD_ID = process.env.BOT_GUILD_ID;
// const __dirname = path.dirname(fileURLToPath(const.meta.url));

const { Guilds, GuildMessages, GuildMembers, GuildMessageReactions, MessageContent } = GatewayIntentBits;

const client = new Client({
    intents: [
        Guilds,
        GuildMessages,
        GuildMembers,
        GuildMessageReactions,
        MessageContent
    ]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on("ready", () => console.log(`Logged in as ${client.user.tag}`));

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

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
});

client.login(TOKEN);