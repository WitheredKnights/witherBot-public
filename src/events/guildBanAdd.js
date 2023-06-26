const { EmbedBuilder } = require("@discordjs/builders");
const { Client, GuildBan, AuditLogEvent } = require("discord.js");
const config = require("../../resources/config");

/**
 * @param {Client} client 
 * @param {GuildBan} ban 
 */
module.exports = async (client, ban) => {
    let logs = await client.channels.fetch(config.channels.logs);

    if(logs) {
        let audit = (await ban.guild.fetchAuditLogs({
            type: AuditLogEvent.MemberBanAdd,
            limit: 1
        })).entries.first();
        let embed = new EmbedBuilder()
            .setTitle('Ban Added')
            .setDescription(`${ban.user.username} has been banned by <@${audit.executor.id}>`)
            .addFields({ name: 'Reason', value: audit.reason || 'No reason provided', inline: true })
            .setColor(0xFFFF00)
            .setTimestamp()
        await logs.send({ embeds: [ embed ] });
    }
}