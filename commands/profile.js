const Discord = require('discord.js');
const Statistics = require('../extra/statistics');
const { steamKey } = require('../config.json');
const SteamAPI = require('steamapi');
const steam = new SteamAPI(steamKey);

module.exports = {
    name: "profile",
    cooldown: 30,
    description: "Lookup Steam Profile.",
    aliases: [],
    async execute(author, message, args, client) {
        if (args.length < 1) {
            const embed = new Discord.MessageEmbed()
            .setTitle("<:steam:744961989817925767> __**Error**__ <:steam:744961989817925767>")
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
            .setTitle("<:steam:744961989817925767> __**Error**__ <:steam:744961989817925767>")
                .setDescription(
                    `You specified too many arguments`
                )
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

            return message.channel.send(embed);
        }
        steam.resolve(args[0]).then(id => {
            steam.getUserSummary(id).then(summary => {
                console.log(summary);
                steam.getUserBans(id).then(async bans => {
                    const embed = new Discord.MessageEmbed()
                    .setTitle("<:steam:744961989817925767> __**Steam Profile**__ <:steam:744961989817925767>")
                    .setDescription(`**Profile:** __[Visit](${summary.url})__`)
                    .addFields(
                        { name: "Steam ID", value: `\`${summary.steamID}\``, inline: true },
                        { name: "Nickname", value: `\`${summary.nickname}\``, inline: true },
                        { name: "Realname", value: `\`${summary.realName}\``, inline: true },
                        { name: "Primary Group", value: `\`${summary.primaryGroupID}\``, inline: true },
                        { name: "Country Code", value: `\`${summary.countryCode}\``, inline: true },
                        { name: "State Code", value: `\`${summary.stateCode}\``, inline: true },
                        { name: "VAC Banned", value: `\`${bans.vacBanned}\``, inline: true },
                        { name: "VAC Bans", value: `\`${bans.vacBans}\``, inline: true },
                        { name: "Game Bans", value: `\`${bans.gameBans}\``, inline: true },
                        { name: "Community Banned", value: `\`${bans.communityBanned}\``, inline: true },
                        { name: "Last Ban", value: `\`${bans.daysSinceLastBan}\``, inline: true },
                        { name: "Economy Bans", value: `\`${bans.economyBan}\``, inline: true },
                        { name: "Persona State", value: `\`${await personaState(summary.personaState)}\``, inline: true },
                    )
                    .setTimestamp()
                    .setThumbnail(summary.avatar.large)
                    .setFooter('Reheight#4947')
                    .setColor(`#ce422b`)
                
                    return message.channel.send(embed);
                }).catch((err) => {
                    const embed = new Discord.MessageEmbed()
                    .setTitle("<:steam:744961989817925767> __**Error**__ <:steam:744961989817925767>")
                    .setDescription(
                        `We were unable to fetch your bans!`
                    )
                    .setTimestamp()
                    .setFooter('Reheight#4947')
                    .setColor(`#ce422b`)

                    return message.channel.send(embed);
                })
            }).catch((err) => {
                const embed = new Discord.MessageEmbed()
                .setTitle("<:steam:744961989817925767> __**Error**__ <:steam:744961989817925767>")
                .setDescription(
                    `We were unable to fetch your profile summary, try making your profile public if it's private!`
                )
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

                return message.channel.send(embed);
            })
        }).catch(() => {
            const embed = new Discord.MessageEmbed()
            .setTitle("<:steam:744961989817925767> __**Error**__ <:steam:744961989817925767>")
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

const personaState = async (personastate) => {
    switch (personastate) {
        case 0:
            return "Offline";
        case 1:
            return "Online";
        case 2:
            return "Busy";
        case 3:
            return "Away";
        case 4:
            return "Snooze";
        case 5:
            return "Looking to Trade";
        case 6:
            return "Looking to Play";
        default:
            return "Error";
    }
}