const Discord = require('discord.js');

module.exports = {
    "name": "botstats",
    "description": "Lookup bot statistics.",
    async execute(author, message, args, client) {
        const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
            client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
		];

		return Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                
                const embed = new Discord.MessageEmbed()
                .setTitle("__**Bot Statistics**__")
                .setDescription(
                    `*Server Count:* \`${totalGuilds}\`
                    *Member Count:* \`${totalMembers}\``
                )
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

				return message.channel.send(embed);
			})
			.catch(console.error);
    }
}