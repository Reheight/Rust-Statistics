const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "help",
    cooldown: 10,
    description: "View a list of the commands available.",
    aliases: ["cmds", "cmd", "commands", "command"],
    async execute(author, message, args, client) {        
        let commands = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

        let pagesMax = commands.length;
        let page = 1;

        const embed = new Discord.MessageEmbed()
            .setTitle("**Rust Statistics | HELP**")
            .setDescription(
                commandInformation(commands, page).description
            )
            .addFields(
                { name: "Command", value: commandInformation(commands, page).name },
                { name: "Cooldown", value: commandInformation(commands, page).cooldown },
                { name: "Aliases", value: commandInformation(commands, page).aliases },
            )
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setFooter(`Page ${page} of ${pagesMax}`)
            .setColor(`#ce422b`)
        
        await commandInformation(commands, page);

        return message.channel.send(embed).then(msg => {
            msg.react('🔼').then(r => {
                msg.react('🔽').then(r => {
                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '🔼' && user.id === author.id;
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '🔽' && user.id === author.id;

                    const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
                    const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });

                    backwards.on('collect', r => {
                        if (page === 1)
                            return r.users.remove(author);
                        
                        page--;

                        const newEmbed = new Discord.MessageEmbed()
                            .setTitle("**Rust Statistics | HELP**")
                            .setDescription(
                                commandInformation(commands, page).description
                            )
                            .addFields(
                                { name: "Command", value: commandInformation(commands, page).name },
                                { name: "Cooldown", value: commandInformation(commands, page).cooldown },
                                { name: "Aliases", value: commandInformation(commands, page).aliases },
                            )
                            .setThumbnail(client.user.avatarURL())
                            .setTimestamp()
                            .setFooter(`Page ${page} of ${pagesMax}`)
                            .setColor(`#ce422b`)

                        msg.edit(newEmbed);
                        return r.users.remove(author);
                    })

                    forwards.on('collect', r => {
                        if (page === pagesMax)
                            return r.users.remove(message.author);

                        page++;

                        const newEmbed = new Discord.MessageEmbed()
                            .setTitle("**Rust Statistics | HELP**")
                            .setDescription(
                                commandInformation(commands, page).description
                            )
                            .addFields(
                                { name: "Command", value: commandInformation(commands, page).name },
                                { name: "Cooldown", value: commandInformation(commands, page).cooldown },
                                { name: "Aliases", value: commandInformation(commands, page).aliases },
                            )
                            .setThumbnail(client.user.avatarURL())
                            .setTimestamp()
                            .setFooter(`Page ${page} of ${pagesMax}`)
                            .setColor(`#ce422b`)

                        msg.edit(newEmbed);
                        return r.users.remove(message.author);
                    })
                })
            })
        })
    }
}

const commandInformation = (commands, index) => {
    const commandFile = require(`../commands/${commands[index - 1]}`);

    if (commandFile.aliases.length <= 0) {
        return {
            name: commandFile.name,
            cooldown: commandFile.cooldown,
            description: commandFile.description,
            aliases: "None Available"
        }
    } else {
        return {
            name: commandFile.name,
            cooldown: commandFile.cooldown,
            description: commandFile.description,
            aliases: `• ${commandFile.aliases.join("\n• ")}`
        }
    }
}