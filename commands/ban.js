const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async(client, message, args) => {
    const LoggingChannel = db.get(`loggingchannel_${message.guild.id}`)
    if (!LoggingChannel) {
        return message.reply(`Please set a Logging Channel with \`\`setlogs\`\` Command!`)
    }
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Sorry, you don't have permission to ban!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    let bUser = message.guild.member(message.mentions.users.first());
    if (!bUser) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Sorry, we can't find that user!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    let bReason = args.slice(1).join(` `);
    if (!bReason) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Please given a reason for the user to be banned!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))

    if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Sorry, that user can not be banned!`)
            .setColor("#0e2b82")
            .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`))
        .then(m => m.delete({ timeout: 30000 }))


    bUser.ban(bUser, {
        bReason: bReason
    })
    message.channel.send(new Discord.MessageEmbed()
        .setDescription(`${bUser} has been banned!`)
        .setColor("#0e2b82")
        .setImage("https://cdn.discordapp.com/attachments/708353767233552498/821455133677846557/tenor.gif")
        .setFooter(`🔑Join https://discord.gg/8wBgDk3 for Support!🔑`));


    let banEmbed = new Discord.MessageEmbed()
        .setTitle(`Ban`)
        .setColor("#0e2b82")
        .addField("Banned User:", `${bUser} ID: ${bUser.id}`)
        .addField("Banned By:", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Banned In:", message.channel)
        .addField("Reason:", bReason)
        .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
        .setTimestamp();
    message.guild.member(bUser).ban();
    client.channels.cache.get(LoggingChannel).send(banEmbed)
}

module.exports.help = {
    name: "ban"
}