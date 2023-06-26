const { Client, Message } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Get the bot ping',
    permission: 0,

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute (client, message, args) {
        let ping = Math.floor(client.ws.ping);
        await message.channel.send(`My ping is currently ${ping}ms.`);
    }
}