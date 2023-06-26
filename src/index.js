const { Client, GatewayIntentBits, Partials, Collection, Presence, ActivityType } = require('discord.js');
const config = require('../resources/config.js');
const { readdirSync } = require('fs');

const client = new Client({
    intents: Object.keys(GatewayIntentBits),
    partials: Object.keys(Partials)
});

const path = __dirname;
client.commands = new Collection();
client.capybaras = readdirSync(path+'/../resources/imgs');
client.capybaraPath = path + '/../resources/imgs';

const commands = readdirSync(path + '/commands').filter(e => e.endsWith('.js'));
for (let file of commands) {
    let command = require(`${path}/commands/${file}`);
    client.commands.set(command.name, command);
}

const events = readdirSync(path + `/events`).filter(e => e.endsWith('.js'));
for (let file of events) {
    let eventName = file.split('.').at(0);
    let event = require(`${path}/events/${file}`);
    client.on(eventName, event.bind(null, client));
}

client.on('messageCreate', async (message) => {

    let logs = await client.channels.fetch(config.channels.logs);

    // Avoid flooding the logs channel.
    if (message.channel.id == logs.id && !message.author.bot) {
        await message.delete();
    }

    // Command executor
    if (!message.content.startsWith(config.bot.prefix)|| message.author.bot) return;
    
    let args = message.content.slice(config.bot.prefix.length).trim().split(/ +/g);
    let command = client.commands.get(args.shift().toLowerCase());

    if (command) {
        await command.execute(client, message, args);
    }
});

client.login(config.bot.token).then(() => {
    client.user.setPresence({
        activities: [{
            name: 'WitheredKnights', type: ActivityType.Playing
        }],
        status: 'idle'
    });
});
