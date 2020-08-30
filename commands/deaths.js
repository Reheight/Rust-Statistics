const Discord = require('discord.js');
const { steamKey } = require('../config.json');
const SteamAPI = require('steamapi');
const steam = new SteamAPI(steamKey);

module.exports = {
    name: "deaths",
    cooldown: 10,
    usage: "deaths <Steam Profile/Steam 64 ID>",
    description: "View your death statistics within Rust.",
    aliases: ["dies", "die", "dead"],
    async execute(author, message, args, client) {
        if (args.length < 1) {
            const embed = new Discord.MessageEmbed()
            .setTitle("<:rust:744963918203584553> __**Error**__ <:rust:744963918203584553>")
                .setDescription(
                    `You must provide a profile!`
                )
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

            return message.channel.send(embed).catch(() => {
                // Unable to perform
            })
        }

        if (args.length > 1) {
            const embed = new Discord.MessageEmbed()
            .setTitle("<:rust:744963918203584553> __**Error**__ <:rust:744963918203584553>")
                .setDescription(
                    `You specified too many arguments`
                )
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

            return message.channel.send(embed).catch(() => {
                // Unable to perform
            })
        }
        steam.resolve(args[0]).then(id => {
            steam.getUserSummary(id).then(summary => {
                const profileImage = summary.avatar.large;

                steam.getUserStats(id, `252490`).then((statistics) => {
                    const stats = statistics.stats;
                    const embed = new Discord.MessageEmbed()
                    .setTitle("<:rust:744963918203584553> __**Rust Statistics**__ <:rust:744963918203584553>")
                    .setDescription(`**Profile:** __[${id}](https://www.steamcommunity.com/profiles/${id})__`)
                    .addFields(
                        { name: "Deaths", value: `\`${(stats.deaths)}\``, inline: true }
                    )
                    .setTimestamp()
                    .setThumbnail(profileImage)
                    .setFooter('Reheight#4947')
                    .setColor(`#ce422b`)
                    console.log(stats);
                    return message.channel.send(embed).catch(() => {
                        // Unable to perform
                    })
                }).catch((error) => {
                    const embed = new Discord.MessageEmbed()
                    .setTitle("<:rust:744963918203584553> __**Error**__ <:rust:744963918203584553>")
                    .setDescription(
                        `We were unable to fetch your Rust Statistics!
                        **Note:** Ensure your profile is public!`
                    )
                    .setTimestamp()
                    .setFooter('Reheight#4947')
                    .setColor(`#ce422b`)
                    console.log(error)
                    return message.channel.send(embed).catch(() => {
                        // Unable to perform
                    })
                })
            }).catch((err) => {
                const embed = new Discord.MessageEmbed()
                .setTitle("<:rust:744963918203584553> __**Error**__ <:rust:744963918203584553>")
                .setDescription(
                    `We were unable to fetch your profile summary, try making your profile public if it's private!`
                )
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

                return message.channel.send(embed).catch(() => {
                    // Unable to perform
                })
            })
        }).catch(() => {
            const embed = new Discord.MessageEmbed()
            .setTitle("<:rust:744963918203584553> __**Error**__ <:rust:744963918203584553>")
                .setDescription(
                    `We were unable to process the query, try using a Steam 64 ID.
                    You can find your Steam 64 ID [here](https://www.steamid.io).`
                )
                .setTimestamp()
                .setFooter('Reheight#4947')
                .setColor(`#ce422b`)

            return message.channel.send(embed).catch(() => {
                // Unable to perform
            })
        })
    }
}