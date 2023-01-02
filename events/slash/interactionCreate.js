const { InteractionType, ActionRowBuilder, ButtonBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js')

const { Client } = require('discord.js-selfbot-v13')

module.exports = async (client, interaction) => {
    try{
        let sltcv = false
if (interaction.type === 5){
    if (interaction.customId === 'pub-modal') {
        
        const token = interaction.fields.getTextInputValue('msg-token');
        const msgtosend = interaction.fields.getTextInputValue('msg-friend');

        if (!interaction.member.roles.cache.some(role => role.id === client.config.wlrole)) return interaction.reply({content: "Tu n'es pas wl", ephemeral: true})

        let testclient = new Client({checkUpdate: false});
        await testclient.login(token).then(async () => {

            testclient.on('ready', () => testclient.destroy())
                
            interaction.reply({content: "** **", ephemeral: true})
            interaction.deleteReply()

                const embed1 = new EmbedBuilder()
                .setColor(0x07FAA9)
                .setTitle("⏳ Publicité en cours")
                .setDescription("Chargement du compte en cours")
                const msg = await interaction.channel.send({embeds: [embed1]})

                
                let selfclient = new Client({checkUpdate: false});
                let ok = 0
                let non = 0
                selfclient.login(token)

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

                    selfclient.relationships.friendCache.forEach(async (friend) => friend.send(msgtosend)
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
            }).catch((e) => {
                if (sltcv === true) return;
                sltcv = true
                const embed = new EmbedBuilder()
                .setColor(0x07FAA9)
                .setTitle("❌ Le token est invalide ou a expiré")
                .setDescription("Il se peut que votre bot ait été banni par discord, ou vous deviez allez rechercher un nouveau token dans l'interface développeur de Discord")
                .addFields(
                    {name: `Utilisation de la commande :`, value: ".pubfriends tokenducompte"}
                )
                return interaction.reply({embeds: [embed], ephemeral: true})
            })
    }
}
    }catch(e){}
}