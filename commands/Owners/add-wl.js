const { PermissionsBitField } = require("discord.js")
const fs = require('fs')

const config = require('./../../config.json')

module.exports = {
    name: 'add-wl',
    aliases: ["add-whitelist", "addwl", "addwhitelist"],

    run: async (client, message, args, prefix) => {
        try{

            function savejson() {
                fs.writeFile("./config.json", JSON.stringify(config), err => {
                    if (err) console.log(err);
                });
              }

            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await message.guild.members.fetch(args[0])
            if (!member) return message.reply(`Aucun membre du serveur de trouvé pour \`${args[0] || "rien"}\``)

            if (client.config.wl.includes(member.id)) return message.reply(`${member.user.username} est déjà wl`)
            config["wl"].push(member.id)
            savejson()
            message.reply(`${member.user.username} est whitelist`)
        }catch(e){
            message.reply(`Aucun membre du serveur de trouvé pour \`${args[0] || "rien"}\``).catch(() => false)
        }
    }
}