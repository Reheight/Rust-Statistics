const Discord = require('discord.js');
const { steamKey } = require('../config.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    "name": "help",
    "description": "Help Page.",
    async execute(author, message, args, client) {
        const embed = new Discord.MessageEmbed()
            .setTitle("<:rust:744963918203584553> __**HELP**__ <:rust:744963918203584553>")
                .setDescription(
                    `\`rs!\` - Prefix
                    \`rs!stats <Steam ID/Link>\` - View Rust Statistics
                    \`rs!kd <Steam ID/Link>\` - View Rust KDR
                    \`rs!botstats\` - View Bot Statistics`
                )
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

        return message.channel.send(embed);
    }
}