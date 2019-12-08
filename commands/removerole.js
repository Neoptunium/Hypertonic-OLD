const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Sorry you don't have permission to use this command!").then(m => {m.delete(10000)});
  let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
  if(!rMember) return message.channel.send("Please provide an user! `!removerole @[USER] [ROLE]`").then(m => {m.delete(10000)});
  let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
  if(!role) return message.channel.send("Please add the role name! `!removerole @[USER] [ROLE]`").then(m => {m.delete(10000)});
  
  if(!rMember.roles.has(role.id)) {
    return message.channel.send(`**__${rMember.displayName}__**, already doesn't have the role!`).then(m => {m.delete(10000)});
  } else {
    await rMember.removeRole(role.id).catch(e => console.log(e.message))
    message.channel.send(`The role **__${role.name}__**, has been removed from **__${rMember.displayName}!__**`)
  }
let embed = new Discord.RichEmbed()
.setDescription(`RemoveRole`)
.setColor("#FF0000")
.addField('User who got the role removed:', rMember.user.username)
.addField('User who removed the role:', message.author.username)
.setFooter("Hypertonic Developers")
.setTimestamp();

let sChannel = message.guild.channels.find(c => c.name === 'bot-logs')
sChannel.send(embed)

}

module.exports.help = {
  name: "removerole"
}