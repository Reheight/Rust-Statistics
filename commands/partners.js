const Discord = require('discord.js');
const partnersFile = require('../extra/partners.json');

module.exports = {
    name: "partners",
    cooldown: 10,
    description: "View information about our partner servers!",
    aliases: ["affiliates", "affiliate", "partnerships", "partner"],
    async execute(author, message, args, client) {
        let partners = partnersFile.partners;

        let pagesMax = partners.length;
        let page = 1;

        const embed = new Discord.MessageEmbed()
            .setTitle(client.guilds.cache.get(partnerInformation(partners, page).guild).name)
            .setDescription(
                partnerInformation(partners, page).description
            )
            .addFields(
                { name: "Invite", value: `[Join Here](${partnerInformation(partners, page).invite})` },
            )
            .setThumbnail(client.guilds.cache.get(partnerInformation(partners, page).guild).iconURL())
            .setTimestamp()
            .setFooter(`Partner ${page} of ${pagesMax}`)
            .setColor(`#ce422b`)
        
        await partnerInformation(partners, page);

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
                            .setTitle(client.guilds.cache.get(partnerInformation(partners, page).guild).name)
                            .setDescription(
                                partnerInformation(partners, page).description
                            )
                            .addFields(
                                { name: "Invite", value: `[Join Here](${partnerInformation(partners, page).invite})` },
                            )
                            .setThumbnail(client.guilds.cache.get(partnerInformation(partners, page).guild).iconURL())
                            .setTimestamp()
                            .setFooter(`Partner ${page} of ${pagesMax}`)
                            .setColor(`#ce422b`)

                        msg.edit(newEmbed)
                        return r.users.remove(author);
                    })

                    forwards.on('collect', r => {
                        if (page === pagesMax)
                            return r.users.remove(message.author);

                        page++;

                        const newEmbed = new Discord.MessageEmbed()
                            .setTitle(client.guilds.cache.get(partnerInformation(partners, page).guild).name)
                            .setDescription(
                                partnerInformation(partners, page).description
                            )
                            .addFields(
                                { name: "Invite", value: `[Join Here](${partnerInformation(partners, page).invite})` },
                            )
                            .setThumbnail(client.guilds.cache.get(partnerInformation(partners, page).guild).iconURL())
                            .setTimestamp()
                            .setFooter(`Partner ${page} of ${pagesMax}`)
                            .setColor(`#ce422b`)

                        msg.edit(newEmbed);
                        return r.users.remove(message.author);
                    })
                })
            })
        })
    }
}

const partnerInformation = (partners, index) => {
    const partner = partners[index - 1]; 

    return {
        name: partner.name,
        description: partner.description,
        invite: partner.invite,
        guild: partner.guildID
    }
}