const { ShardingManager } = require("discord.js");
const { token } = require('./config.json');

const manager = new ShardingManager('./bot.js', {
    totalShards: 'auto',
    token: token
});

manager.on('shardCreate', (shard) =>
    console.log(
        `
        Loaded Shard: ${shard.id}
        `
    ))

manager.spawn();