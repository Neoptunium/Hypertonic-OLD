const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    message.delete();

  let uUser = message.mentions.members.first() || message.member;
  let botembed = new Discord.MessageEmbed()
    .setAuthor(`${uUser.displayName}'s Avatar`, uUser.user.displayAvatarURL())
    .setColor("#0e2b82")
    .setImage(uUser.user.displayAvatarURL())
    .setFooter("🔑Join https://discord.gg/8wBgDk3 for Support!🔑")

  message.channel.send(botembed);
}
module.exports.help = {
  name: "avatar"
}