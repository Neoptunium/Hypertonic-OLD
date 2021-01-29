const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.MessageEmbed()
  .setTitle(`Hypertonic Bot Information`)
  .setThumbnail(bot.user.displayAvatarURL())
  .addField('**ID:**', bot.user.id)
  .setColor("#0e2b82")
  .addField('**Name:**', bot.user.username)
  .addField('**Created On:**', `Sunday, September 1st, 2019`)
  .addField('**Prefix:**', "!")
  .addField('**Channels Being Watched:**', bot.channels.cache.size)
  .addField('**Creator:**', 'Hypertonic Developers')
  .setFooter('🔑Join https://discord.gg/8wBgDk3 for Support!🔑')
    .setTimestamp();

  message.channel.send(botembed);
}
module.exports.help = {
  name: "botinfo"
}