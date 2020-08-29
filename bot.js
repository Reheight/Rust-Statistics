const fs = require('fs');
const { Client, Collection, MessageEmbed } = require('discord.js');
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

//#region Cooldown Collection
const cooldowns = new Collection();
//#endregion

//#region Message Event
client.on('message', async (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    const author = message.author;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (!cooldowns.has(command.name))
		cooldowns.set(command.name, new Collection());
	
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;

			const embed = new MessageEmbed()
				.setTitle("**Rust Statistics Cooldown**")
				.setDescription(
					`You need to slow down, you tried to execute \`${commandName}\` too quicky!`
				)
				.addFields(
					{ name: "⌛ Cooldown", value: `${command.cooldown} seconds`, inline: true },
					{ name: "⌛ Remaining", value: `${timeLeft.toFixed(1)} seconds`, inline: true },
				)
				.setThumbnail(client.user.avatarURL())
				.setTimestamp()
				.setFooter('Reheight#4947')
				.setColor(`#ce422b`)
			
			return await author.send(embed);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
	await command.execute(author, message, args, client);
})

client.login(token)