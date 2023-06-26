const { Client, Message } = require("discord.js");

module.exports = {
    name: 'capybara',
    description: 'Get a random capybara image.',

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(client, message, args) {
        let index = Math.floor(Math.random() * client.capybaras.length);
        
        let msg = await message.channel.send('Getting a random capybara image...');

        let img = client.capybaras[index];

        await msg.edit({ content: null, files: [
            `${client.capybaraPath}/${img}`
        ]})
    }
}