const { EmbedBuilder } = require("@discordjs/builders");
const { Client, Message } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Shows all the commands and their functions.',
    permission: 0,

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(client, message, args) {
        let embed = new EmbedBuilder()
            .setTitle('Command List')
            .setColor(0x00FF00)
            .setTimestamp();

        client.commands.forEach(command => {
            embed.addFields({
                name: command.name, value: command.description
            });
        });
        
        await message.channel.send({ embeds: [embed] });
    }
}