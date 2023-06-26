const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { Message, Client, ButtonStyle } = require('discord.js');
const config = require('../../resources/config');

module.exports = {
    name: 'link',
    description: 'Get the official WitheredKnights links.',
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        let links = new ActionRowBuilder()
            .addComponents(new ButtonBuilder()
                .setLabel('GitHub')
                .setStyle(ButtonStyle.Link)
                .setURL(config.links.github)
            )
            .addComponents(new ButtonBuilder()
                .setLabel('Discord')
                .setStyle(ButtonStyle.Link)
                .setURL(config.links.discord)
            )
            .addComponents(new ButtonBuilder()
                .setLabel('Website')
                .setStyle(ButtonStyle.Link)
                .setURL(config.links.website)
            );

        let embed = { title: 'Here are the official links of WitheredKnights' }

        await message.channel.send({ embeds: [embed], components: [links] });
    }
};
