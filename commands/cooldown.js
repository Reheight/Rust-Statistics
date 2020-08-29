const Discord = require('discord.js');
const { steamKey } = require('../config.json');

module.exports = {
    name: "cooldown",
    cooldown: 30,
    description: "Cooldown information.",
    aliases: ["timer", "limit", "wait"],
    async execute(author, message, args, client) {
        const embed = new Discord.MessageEmbed()
            .setTitle("**Rust Statistics Cooldown**")
            .setDescription(
                `We like to make sure that the bot does not get rate limited, so to ensure we impose a cooldown on all of our commands.`
            )
            .addFields(
                { name: "⌛ Cooldown", value: `${this.cooldown} seconds`, inline: true }
            )
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setFooter('Reheight#4947')
            .setColor(`#ce422b`)

        return message.channel.send(embed);
    }
}