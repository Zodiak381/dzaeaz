const fs = require('fs');
const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
require("colors");
module.exports  = {
  async execute(client) {
    const rest = new REST({ version: '9' }).setToken(client.config.token);
    const slashCommands = [];
    let x = 0;
    fs.readdirSync(`${process.cwd()}/Slashs/`).forEach(async dir => {
      const files = fs.readdirSync(`${process.cwd()}/Slashs/${dir}/`).filter(file => file.endsWith('.js'));

      for (const file of files) {
        const slashCommand = require(`${process.cwd()}/Slashs/${dir}/${file}`);
        slashCommands.push({
          name: slashCommand.name,
          description: slashCommand.description,
          type: slashCommand.type,
          options: slashCommand.options ? slashCommand.options : null,
          default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
          default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
        });
        x++;
        if (slashCommand.name) {
          client.slashCommands.set(slashCommand.name, slashCommand)
        } else {
          console.log(`Command Error: ${slashCommand.name || file.split('.js')[0] || "Pas de nom"}`.brightRed)
        }
      }
    });
    (async () => {
      try {
        await rest.put(
            Routes.applicationCommands(client.config.botid),
          { body: slashCommands }
        ).catch((e) => { console.log((e.message).bold.red) });
        setTimeout(() => {
          console.log("Slashs".blue + " >> " + `${x}`.red + ` Slash Chargés`.green)
        }, 1500)
      } catch (error) {
        console.log(error);
      }
    })();
  }
};
