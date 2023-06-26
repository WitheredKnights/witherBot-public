// Make a command that on !warn sends a private message to the mentioned user that says "This a warning! Act civil."?
module.exports = {
    name: "warn",
    description: "Sends a private message to the mentioned user that says \"This a warning! Act civil.\"",
    usage: "warn <@mention | userID>",
    type: "Moderation",
    execute: (message, args, client) => {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("You don't have the required permission to use this command.");
      }
  
      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  
      if (!user) {
        return message.reply("Please mention a user or provide a valid user ID to warn.");
      }
  
      if (user.id === message.author.id) {
        return message.reply("You cannot warn yourself.");
      }
  
      if (user.id === client.user.id) {
        return message.reply("I cannot warn myself.");
      }
  
      try {
        user.send(`This is a warning! Act civil.`)
        message.channel.send(`${user.tag} has been warned.`)
      } catch (error) {
        message.channel.send(`I was unable to send a warning to ${user.tag}.`);
        console.error(error);
      }
    }
  };
  