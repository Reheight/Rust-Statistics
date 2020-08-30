const Discord = require('discord.js');
const { steamKey } = require('../config.json');
const SteamAPI = require('steamapi');
const steam = new SteamAPI(steamKey);

module.exports = {
    name: "statistics",
    cooldown: 10,
    usage: "statistics <Steam Profile/Steam 64 ID>",
    description: "View your overall Rust statistics.",
    aliases: ["stats"],
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
                    var page = 1;

                    const combat = new Discord.MessageEmbed()
                        .setTitle("<:rust:744963918203584553> __**Rust Statistics**__ <:rust:744963918203584553>")
                        .setDescription(`*Combat* **(Primary)** \\[[${id}](${summary.url})\\]`)
                        .addFields(
                            { name: "Headshots", value: stats.headshot, inline: true },
                            { name: "Kills (Players)", value: stats.kill_player, inline: true },
                            { name: "Kills (Bear)", value: stats.kill_bear, inline: true },
                            { name: "Kills (Boar)", value: stats.kill_boar, inline: true },
                            { name: "Kills (Stag)", value: stats.kill_stag, inline: true },
                            { name: "Kills (Chicken)", value: stats.kill_chicken, inline: true },
                            { name: "Kills (Horse)", value: stats.kill_horse, inline: true },
                            { name: "Kills (Wolf)", value: stats.kill_wolf, inline: true },
                            { name: "Deaths (Overall)", value: stats.deaths, inline: true },
                            { name: "Deaths (Suicide)", value: stats.death_suicide, inline: true},
                            { name: "Deaths (Fall)", value: stats.death_fall, inline: true },
                            { name: "Deaths (Self-Inflicted)", value: stats.death_selfinflicted, inline: true },
                            { name: "Deaths (Entity)", value: stats.death_entity, inline: true },
                            { name: "Deaths (Wolf)", value: stats.death_wolf, inline: true },
                            { name: "Deaths (Bear)", value: stats.death_bear, inline: true },
                            { name: "Wounded (Overall)", value: stats.wounded, inline: true },
                            { name: "Wounded (Assisted)", value: stats.wounded_assisted, inline: true },
                            { name: "Wounded (Healed)", value: stats.wounded_healed, inline: true },
                        )
                        .setThumbnail(profileImage)
                        .setFooter("Reheight#4947", client.guilds.cache.get('744824625397235794').members.cache.get('176425611949113344').user.avatarURL())
                        .setColor('#ce422b')
                        .setTimestamp();

                    var pages = [combat]

                    const pagesMax = pages.length;

                    return message.channel.send(pages[page - 1]).then(msg => {
                        msg.react('🔼').then(r => {
                            msg.react('🔽').then(r => {
                                const backwardsFilter = (reaction, user) => reaction.emoji.name === '🔼' && user.id === author.id;
                                const forwardsFilter = (reaction, user) => reaction.emoji.name === '🔽' && user.id === author.id;
            
                                const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
                                const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
            
                                backwards.on('collect', r => {
                                    if (page === 1)
                                        return r.users.remove(author).catch(() => {
                                            // Unable to perform
                                        })
                                    
                                    page--;
            
                                    msg.edit(pages[page - 1]).catch(() => {
                                        // Unable to perform
                                    })
                                    return r.users.remove(author).catch(() => {
                                        // Unable to perform
                                    })
                                })
            
                                forwards.on('collect', r => {
                                    if (page === pagesMax)
                                        return r.users.remove(message.author).catch(() => {
                                            // Unable to perform
                                        })
            
                                    page++;
            
                                    msg.edit(pages[page - 1]).catch(() => {
                                        // Unable to perform
                                    })
                                    return r.users.remove(message.author).catch(() => {
                                        // Unable to perform
                                    })
                                })
                            })
                        })
                    }).catch(() => {
                        // Error
                    })
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
                        { name: "Upgraded Blocks", value: `\`${(stats.upgraded_blocks)}\``, inline: true },
                        { name: "Harvested Stone", value: `\`${(stats["harvest.stones"])}\``, inline: true },
                    )
                    .setTimestamp()
                    .setThumbnail(profileImage)
                    .setFooter('Reheight#4947')
                    .setColor(`#ce422b`)
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