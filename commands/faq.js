const Discord = require('discord.js');
const faqFile = require('../extra/faq.json');

module.exports = {
    name: "faq",
    cooldown: 30,
    description: "View questions we get often!",
    aliases: ["questions", "answers"],
    async execute(author, message, args, client) {
        let questions = faqFile.questions;

        let pagesMax = questions.length;
        let page = 1;

        const embed = new Discord.MessageEmbed()
            .setTitle("Rust Statistics | FAQ")
            .setDescription(
                `<:question:749404260965548175> ${faqInformation(questions, page).question}
                
                <:agree:744892068513447936> ${faqInformation(questions, page).answer}`
            )
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setFooter(`Question ${page} of ${pagesMax}`)
            .setColor(`#ce422b`)
        
        await faqInformation(questions, page);

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
                        .setTitle("Rust Statistics | FAQ")
                        .setDescription(
                            `<:question:749404260965548175> ${faqInformation(questions, page).question}
                            
                            <:agree:744892068513447936> ${faqInformation(questions, page).answer}`
                        )
                        .setThumbnail(client.user.avatarURL())
                        .setTimestamp()
                        .setFooter(`Question ${page} of ${pagesMax}`)
                        .setColor(`#ce422b`)

                        msg.edit(newEmbed)
                        return r.users.remove(author);
                    })

                    forwards.on('collect', r => {
                        if (page === pagesMax)
                            return r.users.remove(message.author);

                        page++;

                        const newEmbed = new Discord.MessageEmbed()
                            .setTitle("Rust Statistics | FAQ")
                            .setDescription(
                                `<:question:749404260965548175> ${faqInformation(questions, page).question}
                                
                                <:agree:744892068513447936> ${faqInformation(questions, page).answer}`
                            )
                            .setThumbnail(client.user.avatarURL())
                            .setTimestamp()
                            .setFooter(`Question ${page} of ${pagesMax}`)
                            .setColor(`#ce422b`)

                        msg.edit(newEmbed);
                        return r.users.remove(message.author);
                    })
                })
            })
        })
    }
}

const faqInformation = (questions, index) => {
    const question = questions[index - 1]; 

    return {
        question: question.question,
        answer: question.answer
    }
}