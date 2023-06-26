const Discord = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bans a mentioned user",

  async execute (client, message, args) {
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.reply(`I don't have the required permission to ban members.`);
    }

    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.reply(`You don't have the required permission to ban members.`);
    }

    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("Please mention a user to ban.");
    }

    if (user.id === message.author.id) {
      return message.reply("You cannot ban yourself.");
    }

    if (user.id === client.user.id) {
      return message.reply("I cannot ban myself.");
    }

    try {
      await message.guild.members.ban(user);
      message.reply(`${user.tag} has been banned.`);
    } catch (error) {
      message.reply(`I was unable to ban ${user.tag}.`);
      console.error(error);
    }
  }
};
