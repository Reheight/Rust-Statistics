const Discord = require('discord.js');

module.exports = {
    name: "suggestion",
    cooldown: 10,
    description: "Suggest improvements and/or features to the bot Developers.",
    aliases: ["support", "assist", "suggest"],
    async execute(author, message, args, client) {
        const suggestion = args.join(" ");
        if (args.length <= 0 || suggestion.length < 20) {
            const errorEmbed = new Discord.MessageEmbed()
            .setTitle("**Suggestion**")
            .setDescription("You must provide a valid message that has over 20 characters!")
            .setFooter("Reheight#4947", client.guilds.cache.get('744824625397235794').members.cache.get('176425611949113344').user.avatarURL())
            .setColor('#ce422b')
            .setTimestamp();

            return message.channel.send(errorEmbed);
        }

        if (containsLink(suggestion)) {
            const errorEmbed = new Discord.MessageEmbed()
            .setTitle("**Suggestion**")
            .setDescription("We do not allow links for safety reasons, try again without the link!")
            .setFooter("Reheight#4947", client.guilds.cache.get('744824625397235794').members.cache.get('176425611949113344').user.avatarURL())
            .setColor('#ce422b')
            .setTimestamp();

            return message.channel.send(errorEmbed);
        }

        const playerEmbed = new Discord.MessageEmbed()
        .setTitle("**Suggestion**")
        .setDescription(Discord.Util.escapeMarkdown(suggestion))
        .setFooter(`${author.tag} (${author.id})`, author.avatarURL())
        .setColor('#ce422b')
        .setTimestamp();

        await message.channel.send(playerEmbed);
        await client.users.cache.get('176425611949113344').send(playerEmbed);
    }
}

const containsLink = (url) => {
    var regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    if (regex.test(url)) {
        return true;
    } else {
        return false;
    }
}