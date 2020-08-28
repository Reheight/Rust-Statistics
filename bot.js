const fs = require('fs');
const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./config.json'); 

const client = new Client();
client.commands = new Collection();

client.on('shardDisconnect', (closeEvent, number) => {
	console.log(
	`
	Shard ${number} Disconnected:
	${closeEvent.reason}
	`
	);
})

client.on('shardError', (error, number) => {
	console.log(
	`
	Shard ${number} Error:
	${error}
	`
	);
})

client.on('shardReconnecting', (number) => {
	console.log(
	`
	Shard ${number} Reconnecting...
	`
	);
})

client.on('shardResume', (number) => {
	console.log(
	`
	Shard ${number} has resumed...
	`
	);
})

client.on('shardReady', (number) => {
	console.log(
	`
	Shard ${number} is now ready!
	`
	);

	client.user.setActivity(`rs! | Shard: ${number}`, { type: 'WATCHING' });
})

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
	
	if (!message.content.startsWith(prefix)) return;

    const author = message.author;
    const args = message.content.slice(prefix.length).trim().split(/ +/); // Getting message, removing the prefix, then splitting the message into an array.
    const command = args.shift().toLowerCase(); // Removing first argument from args array, making it all lowercase, then returning it.
    
    //#region Checking if command exists
    if (!client.commands.has(command)) return;

    client.commands.get(command).execute(author, message, args, client);
    //#endregion
})

client.login(token)