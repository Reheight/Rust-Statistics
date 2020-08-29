const Discord = require('discord.js');

module.exports = {
    name: "about",
    cooldown: 10,
    description: "View information about the bot.",
    aliases: ["botstats", "bot", "info", "information"],
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
                .setTitle("**Rust Statistics Information**")
                .setDescription(
                    `View your Rust Statistics over the course of your Rust history, we display most of the statistics that could possibly matter to you, we do plan on expanding to other games!`
                )
                .addFields(
                    { name: "<:developer:749333179210661899> Developer", value: `Reheight#4947`, inline: true },
                    { name: "<:version:749333179315519578> Version", value: `1.0.0`, inline: true },
                    { name: "<:javascript:749333179130708018> Language", value: `JavaScript`, inline: true },
                    { name: "<:discordjs:749333179109736488> Library", value: `Discord.JS`, inline: true },
                    { name: "<:steam:744961989817925767> API", value: `Steam API`, inline: true },
                    { name: "🏠 Guilds", value: `${totalGuilds}`, inline: true },
                    { name: "🙍‍♂️ Members", value: `${totalMembers}`, inline: true }
                )
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

				return message.channel.send(embed);
			})
			.catch(console.error);
    }
}