const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const fs = require("fs");
const prefix = botconfig.prefix;
const {registerEvents } = require('../../../../../../OSRP-BOT/BOT/handlers/events'); // Register Event Function Import
const bot = new Discord.Client({
  disableEveryone: true
});
registerEvents(bot, '../events'); // Call Imported RegisterEvents Function.
bot.commands = new Discord.Collection();
bot.prefix = prefix;
bot.config = botconfig;
const CurrentTimers = new Map();
const client = new Discord.Client();
let statuses = ['🗯️!help🗯️', '🔑!cmds🔑', '🖥️discord.gg/8wBgDk3🖥️', 'Prefix: !', 'Version 1.2.1'];
setInterval(function () {

  let status = statuses[Math.floor(Math.random() * statuses.length)];

  bot.user.setPresence({

    activity: {
      name: status
    },

    status: 'online'
  });
}, 5000)


fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});



bot.login(process.env.token);
