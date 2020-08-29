const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "help",
    cooldown: 30,
    description: "Help Page.",
    aliases: [],
    async execute(author, message, args, client) {        
        let commands = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

        let pagesMax = commands.length;
        let page = 1;

        const embed = new Discord.MessageEmbed()
            .setTitle("**Rust Statistics | HELP**")
            .setDescription(
                `Scroll through the commands using 🔼 and 🔽 reactions!`
            )
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setFooter(`Page ${page} of ${pagesMax}`)
            .setColor(`#ce422b`)
        
        await commandInformation(commands, page);
        return message.channel.send(embed);
    }
}

async function commandInformation(commands, index) {
    const commandFile = require(`/commands/${commands[index - 1]}`);
    console.log(commandFile);
}