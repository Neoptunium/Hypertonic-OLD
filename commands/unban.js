const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client, message, args) => {
    const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
        return message.reply(`Please set a Logging Channel with \`\`setlogs\`\` Command!`)
    }
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Sorry, you dont have permission to unban!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    let bannedMember = await message.guild.fetchBan(args[0])
    if (!bannedMember) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Please provide a user id to unban someone!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    let reason = args.slice(1).join(" ")
    if (!reason) reason = "No reason given"
    message.delete()
    try {
        message.guild.members.unban(bannedMember.user, {
            reason: reason
        })
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${bannedMember.user} has been unbanned!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
    } catch (e) {
        console.log(e.message)
    }

    let banEmbed = new Discord.MessageEmbed()
        .setColor("#0e2b82")
        .setTitle("Unban")
        .addField("Unbanned User:", `${bannedMember.user} ID: ${bannedMember.user.id} `)
        .addField("Unbanned By:", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Reason:", reason)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
    client.channels.cache.get(LoggingChannel).send(banEmbed)
}

module.exports.help = {
    name: "unban"
}