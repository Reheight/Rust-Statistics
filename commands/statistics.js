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

                    const combatPrimary = new Discord.MessageEmbed()
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
                            { name: "Kills (Scientist)", value: stats.kill_scientist, inline: true },
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
                    
                    const combatMisc = new Discord.MessageEmbed()
                        .setTitle("<:rust:744963918203584553> __**Rust Statistics**__ <:rust:744963918203584553>")
                        .setDescription(`*Combat* **(Miscellaneous)** \\[[${id}](${summary.url})\\]`)
                        .addFields(
                            { name: "Bullets Fired", value: stats.bullet_fired, inline: true },
                            { name: "Arrows Fired", value: stats.arrow_fired, inline: true },
                            { name: "Arrows Shot", value: stats.arrows_shot, inline: true },
                            { name: "Rockets Fired", value: stats.rocket_fired, inline: true },
                            { name: "Shotguns Fired", value: stats.shotgun_fired, inline: true },
                            { name: "Melee Thrown", value: stats.melee_thrown, inline: true },
                            { name: "Melee Strikes", value: stats.melee_strikes, inline: true },
                            { name: "Bullet Hit (Player)", value: stats.bullet_hit_player, inline: true },
                            { name: "Bullet Hit (Entity)", value: stats.bullet_hit_entity, inline: true },
                            { name: "Bullet Hit (Building)", value: stats.bullet_hit_building, inline: true },
                            { name: "Bullet Hit (Bear)", value: stats.bullet_hit_bear, inline: true },
                            { name: "Bullet Hit (Horse)", value: stats.bullet_hit_horse, inline: true },
                            { name: "Bullet Hit (Stag)", value: stats.bullet_hit_stag, inline: true },
                            { name: "Bullet Hit (Wolf)", value: stats.bullet_hit_wolf, inline: true },
                            { name: "Bullet Hit (Boar)", value: stats.bullet_hit_boar, inline: true },
                            { name: "Bullet Hit (Sign)", value: stats.bullet_hit_sign, inline: true },
                            { name: "Bullet Hit (Player Corpse)", value: stats.bullet_hit_playercorpse, inline: true },
                            { name: "Bullet Hit (Corpse)", value: stats.bullet_hit_corpse, inline: true },
                            { name: "Bullet Hit (Building)", value: stats.bullet_hit_building, inline: true },
                            { name: "Arrow Hit (Entity)", value: stats.arrow_hit_entity, inline: true },
                            { name: "Arrow Hit (Building)", value: stats.arrow_hit_building, inline: true },
                            { name: "Arrow Hit (Boar)", value: stats.arrow_hit_boar, inline: true },
                            { name: "Arrow Hit (Bear)", value: stats.arrow_hit_bear, inline: true },
                            { name: "Arrow Hit (Wolf)", value: stats.arrow_hit_wolf, inline: true },
                            { name: "Arrow Hit (Stag)", value: stats.arrow_hit_stag, inline: true },
                            { name: "Arrow Hit (Chicken)", value: stats.arrow_hit_chicken, inline: true },
                            { name: "Arrow Hit (Horse)", value: stats.arrow_hit_horse, inline: true },
                            { name: "Arrow Hit (Player)", value: stats.arrow_hit_player, inline: true },
                            { name: "Shotgun Hit (Building)", value: stats.shotgun_hit_building, inline: true },
                            { name: "Shotgun Hit (Player)", value: stats.shotgun_hit_player, inline: true },
                            { name: "Shotgun Hit (Horse)", value: stats.shotgun_hit_horse, inline: true },
                            { name: "Shotgun Hit (Entity)", value: stats.shotgun_hit_entity, inline: true },
                        )
                        .setThumbnail(profileImage)
                        .setFooter("Reheight#4947", client.guilds.cache.get('744824625397235794').members.cache.get('176425611949113344').user.avatarURL())
                        .setColor('#ce422b')
                        .setTimestamp();

                    const farming = new Discord.MessageEmbed()
                        .setTitle("<:rust:744963918203584553> __**Rust Statistics**__ <:rust:744963918203584553>")
                        .setDescription(`*Farming* \\[[${id}](${summary.url})\\]`)
                        .addFields(
                            { name: "Harvested (Stones)", value: stats["harvest.stones"] + stats.harvested_stones, inline: true },
                            { name: "Harvested (Cloth)", value: stats["harvest.cloth"] + stats.harvested_cloth, inline: true },
                            { name: "Harvested (Wood)", value: stats["harvest.wood"] + stats.harvested_wood, inline: true },
                            { name: "Harvested (Leather)", value: stats.harvested_leather, inline: true },
                            { name: "Acquired (Lowgrade)", value: stats.acquired_lowgradefuel, inline: true },
                            { name: "Acquired (Metal Ore)", value: stats["acquired_metal.ore"], inline: true },
                            { name: "Acquired (Scrap)", value: stats.acquired_scrap, inline: true },
                            { name: "Acquired (Metal Ore)", value: stats["acquired_metal.ore"], inline: true },
                            { name: "Barrels Destroyed", value: stats.destroyed_barrels, inline: true },
                        )
                        .setThumbnail(profileImage)
                        .setFooter("Reheight#4947", client.guilds.cache.get('744824625397235794').members.cache.get('176425611949113344').user.avatarURL())
                        .setColor('#ce422b')
                        .setTimestamp();

                    const building = new Discord.MessageEmbed()
                        .setTitle("<:rust:744963918203584553> __**Rust Statistics**__ <:rust:744963918203584553>")
                        .setDescription(`*Building* \\[[${id}](${summary.url})\\]`)
                        .addFields(
                            { name: "Placed Blocks", value: stats.placed_blocks, inline: true },
                            { name: "Upgraded Blocks", value: stats.upgraded_blocks, inline: true }
                        )
                        .setThumbnail(profileImage)
                        .setFooter("Reheight#4947", client.guilds.cache.get('744824625397235794').members.cache.get('176425611949113344').user.avatarURL())
                        .setColor('#ce422b')
                        .setTimestamp();
                        
                    const miscellaneous = new Discord.MessageEmbed()
                        .setTitle("<:rust:744963918203584553> __**Rust Statistics**__ <:rust:744963918203584553>")
                        .setDescription(`*Miscellaneous* \\[[${id}](${summary.url})\\]`)
                        .addFields(
                            { name: "Blueprints Studied", value: stats.blueprint_studied, inline: true },
                            { name: "Inventory Opened (Count)", value: stats.INVENTORY_OPENED, inline: true },
                            { name: "Crafting Opened (Count)", value: stats.CRAFTING_OPENED, inline: true },
                            { name: "Map Opened (Count)", value: stats.MAP_OPENED, inline: true },
                            { name: "Cupboard Opened (Count)", value: stats.CUPBOARD_OPENED, inline: true },
                            { name: "Items Examined", value: stats.ITEM_EXAMINED, inline: true },
                            { name: "Comfort Duration", value: stats.comfort_duration.toFixed(2), inline: true },
                            { name: "Calories Consumed", value: stats.calories_consumed.toFixed(2), inline: true },
                            { name: "Water Consumed", value: stats.water_consumed.toFixed(2), inline: true },
                            { name: "Food (Pickup)", value: stats.pickup_category_food, inline: true },
                            { name: "Radiation Duration (Total)", value: stats.radiation_exposure_duration.toFixed(2), inline: true },
                            { name: "Cold Exposure (Total)", value: stats.cold_exposure_duration.toFixed(2), inline: true },
                            { name: "Hot Exposure (Total)", value: stats.hot_exposure_duration.toFixed(2), inline: true },
                            { name: "Seconds Speaking", value: stats.seconds_speaking.toFixed(2), inline: true },
                            { name: "Horse Ridden (Distance)", value: `${stats.horse_distance_ridden} (${stats.horse_distance_ridden_km} km)`, inline: true },
                            { name: "Helipad Landings", value: stats.helipad_landings, inline: true },
                            { name: "Cargoship Bridge Visits", value: stats.cargoship_bridge_visits, inline: true },
                            { name: "Notes Played", value: stats.InstrumentNotesPlayed, inline: true }
                        )
                        .setThumbnail(profileImage)
                        .setFooter("Reheight#4947", client.guilds.cache.get('744824625397235794').members.cache.get('176425611949113344').user.avatarURL())
                        .setColor('#ce422b')
                        .setTimestamp();

                    var pages = [combatPrimary, combatMisc, farming, building, miscellaneous]

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