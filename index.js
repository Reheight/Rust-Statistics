const { ShardingManager } = require("discord.js");
const { token } = require('./config.json');

const manager = new ShardingManager('./bot.js', {
    totalShards: 2,
    token: token
});

manager.on('shardCreate', (shard) =>
    console.log(
        `
        Loaded Shard: ${shard.id}
        `
    ))

manager.spawn();

const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());

const service = app.listen(23223, () => {
    console.log(`API is now active on port: ${service.address().port}`);
});

app.set('json spaces', 2);

app.get('/api', (req, res) => {
    res.json(manager.shards);
});