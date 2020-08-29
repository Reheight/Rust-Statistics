const Discord = require('discord.js');
const Statistics = require('../extra/statistics');
const { steamKey } = require('../config.json');
const SteamAPI = require('steamapi');
const steam = new SteamAPI(steamKey);

module.exports = {
    name: "statistics",
    cooldown: 30,
    description: "Lookup statistics.",
    aliases: [],
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

            return message.channel.send(embed);
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

            return message.channel.send(embed);
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
                        { name: "Player Kills", value: `\`${(stats.kill_player)}\``, inline: true },
                        { name: "Total Deaths", value: `\`${(stats.deaths)}\``, inline: true },
                        { name: "Headshots", value: `\`${(stats.headshot)}\``, inline: true },
                        { name: "Bullets Fired", value: `\`${(stats.bullet_fired)}\``, inline: true },
                        { name: "Arrows Fired", value: `\`${(stats.arrow_fired)}\``, inline: true },
                        { name: "Rockets Fired", value: `\`${(stats.rocket_fired)}\``, inline: true },
                        { name: "Items Dropped", value: `\`${(stats.item_drop)}\``, inline: true },
                        { name: "Researched BPs", value: `\`${(stats.blueprint_studied)}\``, inline: true },
                        { name: "Suicides", value: `\`${(stats.death_suicide)}\``, inline: true },
                        { name: "Bullets Hit on Players", value: `\`${(stats.bullet_hit_player)}\``, inline: true },
                        { name: "Arrows Hit", value: `\`${(stats.arrow_hit_entity)}\``, inline: true },
                        { name: "Bears Killed", value: `\`${(stats.kill_bear)}\``, inline: true },
                        { name: "Boars Killed", value: `\`${(stats.kill_boar)}\``, inline: true },
                        { name: "Stags Killed", value: `\`${(stats.kill_stag)}\``, inline: true },
                        { name: "Wolves Killed", value: `\`${(stats.kill_wolf)}\``, inline: true },
                        { name: "Scientists Killed", value: `\`${(stats.kill_scientist)}\``, inline: true },
                        { name: "Placed blocks", value: `\`${(stats.placed_blocks)}\``, inline: true },
                        { name: "Upgraded Blocks", value: `\`${(stats.upgraded_blocks)}\``, inline: true }
                    )
                    .setTimestamp()
                    .setThumbnail(profileImage)
                    .setFooter('Reheight#4947')
                    .setColor(`#ce422b`)
                    return message.channel.send(embed);
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
                    return message.channel.send(embed);
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

                return message.channel.send(embed);
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

            return message.channel.send(embed);
        })
    }
}