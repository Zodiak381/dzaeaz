const { PermissionsBitField, EmbedBuilder } = require("discord.js")

const { Client } = require('discord.js-selfbot-v13')

module.exports = {
    name: 'pubfriends',
    aliases: [],

    run: async (client, message, args, prefix) => {
        try{
            if (!message.member.roles.cache.some(role => role.id === client.config.wlrole)) return message.reply("Tu n'es pas wl")

            
            let testclient = new Client({checkUpdate: false});
            await testclient.login(args[0]).then(async () => {

            testclient.on('ready', () => testclient.destroy())

                const embed = new EmbedBuilder()
                .setColor(0x07FAA9)
                .setTitle("Entrez votre message de publicité pour tous les serveurs")
                .setFooter({text: "Vous avez 5 minutes pour entrer un message."})

                await message.channel.send({embeds: [embed]})
                const filter = m => m.author.id === message.author.id
                const collector = await message.channel.createMessageCollector({filter, max: 1, time: 300000, errors: ['time'] })
                collector.on('collect', async m => {

                    const embed1 = new EmbedBuilder()
                    .setColor(0x07FAA9)
                    .setTitle("⏳ Publicité en cours")
                    .setDescription("Chargement du compte en cours")
                    const msg = await message.channel.send({embeds: [embed1]})

                    let selfclient = new Client({checkUpdate: false});
                    let ok = 0
                    let non = 0
                    selfclient.login(args[0])




                      selfclient.on("ready", () => {
                        const embed2 = new EmbedBuilder()
                        .setColor(0x07FAA9)
                        .setTitle("⏳ Publicité en cours")
                        .setDescription(`Connexion au compte ${selfclient.user.username} réussi`)
                        msg.edit({embeds: [embed2]})
    
                        const embed = new EmbedBuilder()
                        .setColor(0x07FAA9)
                        .setTitle("⏳ Publicité en cours")
                        .setDescription("L'envoie du message est en cours")
                        setTimeout(() => msg.edit({embeds: [embed]}), 2000)
                        
                        if (selfclient.relationships.friendCache.size === 0) return m.channel.send({embeds: [new EmbedBuilder().setTitle("❌ Message non envoyé").setDescription(`${selfclient.user.username} n'a pas d'amis`).setFooter({text: `Envois: 0`}).setColor(0x07FAA9)]})

                        selfclient.relationships.friendCache.forEach(async (friend) => friend.send(m.content)
                    .then(() => {
                        ok++
                        if (ok + non === selfclient.relationships.friendCache.size){
                            m.channel.send({embeds: [new EmbedBuilder().setTitle("✅ Message envoyé à tous les amis").setDescription(`Envoyée avec succès à **${ok}** personne`).setFooter({text: `Envois échoués: ${non}`}).setColor(0x07FAA9)]})
                        }
                    })
                    .catch(() => {
                        non++
                        if (ok + non === selfclient.relationships.friendCache.size){
                            m.channel.send({embeds: [new EmbedBuilder().setTitle("✅ Message envoyé à tous les amis").setDescription(`Envoyée avec succès à **${ok}** personne`).setFooter({text: `Envois échoués: ${non}`}).setColor(0x07FAA9)]})
                        }
                    }))


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
                    {name: `Utilisation de la commande :`, value: ".pubfriends tokenducompte"}
                )
                return message.channel.send({embeds: [embed]})
            })

        }catch(e){
            console.log(e)
        }
    }
}