const { PermissionsBitField, EmbedBuilder } = require("discord.js")

const { Client } = require('discord.js-selfbot-v13')
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'join',
    aliases: [],

    run: async (client, message, args, prefix) => {
        try{
            if (!message.member.roles.cache.some(role => role.id === client.config.wlrole)) return message.reply("Tu n'es pas wl")

            let join = false

            let testclient = new Client({checkUpdate: false});
            await testclient.login(args[0])
            .then(async () => {
                testclient.destroy()

                const embed = new EmbedBuilder()
                .setColor(0x07FAA9)
                .setTitle("Entrez l'id du salon")
                .setFooter({text: "Vous avez 5 minutes pour entrer l'id du salon."})

                await message.channel.send({embeds: [embed]})
                const filter = m => m.author.id === message.author.id
                const collector = await message.channel.createMessageCollector({filter, max: 1, time: 300000, errors: ['time'] })
                collector.on('collect', async m => {
                    let selfclient = new Client({checkUpdate: false});
                    selfclient.login(args[0])
                    selfclient.on('ready', () => {
                        const channel = m.mentions.channels.first() || selfclient.channels.cache.get(m.content)
                        if (!channel) return message.channel.send({embeds: [new EmbedBuilder().setDescription(`Aucun salon de trouvé pour ${m.content}`).setTitle("❌ Impossible de rejoindre le vocal").setColor(0x07FAA9)]})
    
                        const connection = joinVoiceChannel({
                            channelId: channel.id,
                            guildId: channel.guild.id,
                            adapterCreator: channel.guild.voiceAdapterCreator,
                        })

                        connection.on('stateChange', () => {
                            if (join === true) return;
                            const embed = new EmbedBuilder()
                            .setColor(0x07FAA9)
                            .setTitle("✅ Salon rejoint")
                            .setDescription("Le compte a pu rejoindre le salon vocal")
                            join = true
                            return message.channel.send({embeds: [embed]})
                        })

                        connection.on('error', () => {
                            const embed = new EmbedBuilder()
                            .setColor(0x07FAA9)
                            .setTitle("❌ Impossiblle de rejoindre le salon vocal")
                            .setDescription("Le compte n'a peut être pas les permissions pour rejoindre ce vocal")
                            .addFields(
                                {name: `Utilisation de la commande :`, value: ".join tokenducompte"}
                            )
                            return message.channel.send({embeds: [embed]})
                        })
                    })
                })
            })
            .catch((e) => {
                console.log(e)
                const embed = new EmbedBuilder()
                .setColor(0x07FAA9)
                .setTitle("❌ Le token est invalide ou a expiré")
                .setDescription("Il se peut que votre bot ait été banni par discord, ou vous deviez allez rechercher un nouveau token dans l'interface développeur de Discord")
                .addFields(
                    {name: `Utilisation de la commande :`, value: ".join tokenducompte"}
                )
                return message.channel.send({embeds: [embed]})
            })
        }catch(e){}
    }
}