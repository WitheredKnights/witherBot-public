const { EmbedBuilder } = require("@discordjs/builders");
const { Client, Message } = require("discord.js");
const config = require("../../resources/config");

/**
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (client, message) => {
    
    let logs = await client.channels.fetch(config.channels.logs);

    // Anti deletion
    if(message.channel.id == logs.id && message.author.id == client.user.id) {
        let embed = message.embeds[0];
        await message.channel.send({ embeds: [embed] });
        return;
    }
    
    // Ignore bots
    if(message.author.bot) return;
    // Ignore the logs channel
    if(message.channel.id == logs.id) return;

    // Send to logs
    let embed = new EmbedBuilder()
        .setTitle('Message Deleted')
        .setAuthor({ iconURL: message.author.avatarURL(), name: message.author.tag })
        .addFields(
            { name: 'Content', value: message.content || 'No message content', inline: false },
            { name: 'Channel', value: `<#${message.channel.id}>`, inline: true }
        )
        .setImage(message.attachments.first()?.url || null)
        .setColor(0xFF0000)
        .setTimestamp();
        
    await logs.send({ embeds: [ embed ]});
}