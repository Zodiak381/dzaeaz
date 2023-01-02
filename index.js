const { Client, GatewayIntentBits, Collection } = require('discord.js')
const { readdirSync } = require('fs')
require('colors')
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
})

client.config = require("./config.json")
client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection()
client.login(client.config.token || process.env.token)

const loadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
      const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
  
      for (const file of commands) {
        const getFileName = require(`${dir}/${dirs}/${file}`);
        client.commands.set(getFileName.name, getFileName);
     console.log("System".blue + " >> " + `commande `.green + `${getFileName.name}`.red+ ` chargé `.green)
  };
    });
  };
  const loadEvents = (dir = "./events/") => {
    readdirSync(dir).forEach(dirs => {
      const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
  
      for (const event of events) {
        const evt = require(`${dir}/${dirs}/${event}`);
        const evtName = event.split(".")[0];
        client.on(evtName, evt.bind(null, client));
        console.log("System".blue + " >> " + `event `.green +  evtName.red + ` chargé`.green)
      };
    });
  };

loadEvents();
loadCommands();

['slashCommand'].forEach((handler) => {
  const file = require(`./handlers/${handler}`)
  if (file.execute) file.execute(client);
  else file(client);
});