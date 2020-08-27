const Discord = require('discord.js');
const Statistics = require('../extra/statistics');
const { steamKey } = require('../config.json');
const SteamAPI = require('steamapi');
const steam = new SteamAPI(steamKey);

module.exports = {
    "name": "stats",
    "description": "Lookup statistics.",
    async execute(author, message, args, client) {
        if (args.length < 1) {
            const embed = new Discord.MessageEmbed()
            .setTitle("__**Error**__")
                .setDescription(
                    `You must provide a profile!`
                )
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

            return message.channel.send(embed);
        }

        if (args.length > 1) {
            const embed = new Discord.MessageEmbed()
            .setTitle("__**Error**__")
                .setDescription(
                    `You specified too many arguments`
                )
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

            return message.channel.send(embed);
        }
        console.log(args[0]);
        steam.resolve(args[0]).then(id => {
            steam.getUserSummary(id).then(summary => {
                const profileImage = summary.avatar.large;
                console.log(profileImage);
            }).catch((err) => {
                console.log(err);
            })
        }).catch(() => {
            const embed = new Discord.MessageEmbed()
            .setTitle("__**Error**__")
                .setDescription(
                    `We were unable to process the query, try using a Steam 64 ID.
                    You can find your Steam 64 ID [here](https://www.steamid.io).`
                )
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

            return message.channel.send(embed);
        })
    }
}