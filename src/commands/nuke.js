const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config');

module.exports = {
  name: 'deletechannel',
  description: 'Deletes the channel and makes a channel with the same name and permissions as the channel',
  async execute(message, args) {
    // Check if user has the correct permissions
    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
      return message.reply("You do not have permission to delete channels.");
    }
    // Check if a channel is specified
    if (!args[0]) {
      return message.reply("Please specify a channel to delete.");
    }
    // Get the channel to delete
    const channelToDelete = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!channelToDelete) {
      return message.reply("I could not find that channel.");
    }
    // Store the name, type, and permission overwrites of the channel
    const channelName = channelToDelete.name;
    const channelType = channelToDelete.type;
    const channelPermissionOverwrites = channelToDelete.permissionOverwrites.map(overwrite => ({
      id: overwrite.id,
      type: overwrite.type,
      allow: overwrite.allow,
      deny: overwrite.deny
    }));
    // Delete the channel
    await channelToDelete.delete();
    // Create a new channel with the same name, type, and permission overwrites
    message.guild.channels.create(channelName, {
      type: channelType,
      permissionOverwrites: channelPermissionOverwrites
    });
    message.channel.send(`The channel ${channelName} has been deleted and recreated`);
  }
}
