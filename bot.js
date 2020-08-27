const fs = require('fs');
const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./config.json'); 

const client = new Client();
client.commands = new Collection();

//#region Command Handling
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    console.log(`We have added '${prefix}${command.name}' to the commands!`);
}
//#endregion

//#region Message Event
client.on('message', async (message) => {
    if (message.author.bot) return; // Ensure the message isn't from a bot
    if (message.channel.type === 'dm') return; // Ensure the message isn't in a DM

    const author = message.author;
    const args = message.content.slice(prefix.length).trim().split(/ +/); // Getting message, removing the prefix, then splitting the message into an array.
    const command = args.shift().toLowerCase(); // Removing first argument from args array, making it all lowercase, then returning it.
    
    //#region Checking if command exists
    if (!client.commands.has(command)) return;

    client.commands.get(command).execute(author, message, args, client);
    //#endregion
})

/* client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'botstats') {
		const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
			client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
		];

		return Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
				return message.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
			})
			.catch(console.error);
	}
}); */

client.login(token)