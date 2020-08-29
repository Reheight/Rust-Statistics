const Discord = require('discord.js');
const { steamKey } = require('../config.json');

module.exports = {
    "name": "about",
    "description": "About Page.",
    async execute(author, message, args, client) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(client.user.tag, client.user.avatarURL())
            .setTitle("**Rust Statistics Information**")
                .setDescription(
                    `\`rs!\` - Prefix
                    \`rs!stats <Steam ID/Link>\` - View Rust Statistics
                    \`rs!statistics <Steam ID/Link>\` - View statistics
                    \`rs!kd <Steam ID/Link>\` - View Rust KDR
                    \`rs!kills <Steam ID/Link>\` - View Kills
                    \`rs!deaths <Steam ID/Link>\` - View Deaths
                    \`rs!profile <Steam ID/Link>\` - View Steam Profile
                    \`rs!suggestion <Message>\` - Suggest Something to the Developers
                    \`rs!botstats\` - View Bot Statistics`
                )
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

        return message.channel.send(embed);
    }
}