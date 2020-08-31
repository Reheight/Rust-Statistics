const Discord = require('discord.js');
const { ownerID } = require('../config.json');

module.exports = {
    name: "eval",
    cooldown: 10,
    usage: "eval (code)",
    description: "Evaluation command (BOT OWNER ONLY)",
    aliases: ["execute", "exec", "evaluate"],
    async execute(author, message, args, client) {
        if (author.id !== ownerID) return;

        const clean = text => {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
            
            const embed = new Discord.MessageEmbed()
                .setTitle("**Eval Success**")
                .addFields(
                    { name: "Code", value: `\`\`\`js
${Discord.Util.escapeMarkdown(code)}
                    \`\`\`` }
                )
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

            return message.channel.send(embed).catch(() => {
                // Unable to perform
            })
        } catch (err) {
            const embed = new Discord.MessageEmbed()
                .setTitle("**Eval Error**")
                .setDescription(
                    `\`${err}\``
                )
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

            return message.channel.send(embed).catch(() => {
                // Unable to perform
            })
        }
    }
}