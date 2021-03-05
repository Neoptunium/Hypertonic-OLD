const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.MessageEmbed()
    .setTitle("**__🖥General Commands🖥__**")
    .setColor("#0e2b82")
    .setDescription("`botinfo` | `serverinfo` | `userinfo` | `help` | `support` | `invite` | `comingsoon` |`count` | `poll` | `checkstrikes` | `checkcommends` | `startstream` | `reminder` | `avatar` | `stopwatch`")
    .setFooter(message.createdAt)
    .setThumbnail("https://cdn.discordapp.com/attachments/635162251719868468/653052312167907359/h.jpg")
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")
    .setTimestamp();
  message.channel.send(botembed);
}
module.exports.help = {
  name: "generalcmds"
}
