const { PermissionsBitField, EmbedBuilder } = require("discord.js")

const { Client } = require('discord.js-selfbot-v13')

module.exports = {
    name: 'info',
    aliases: [],

    run: async (client, message, args, prefix) => {
        try{
            if (!message.member.roles.cache.some(role => role.id === client.config.wlrole)) return message.reply("Tu n'es pas wl")

            let testclient = new Client({checkUpdate: false});
            await testclient.login(args[0])
            .then(async () => {
                testclient.on('ready', async () => {

                    //const badges = testclient.user.flags.toArray()
                    let compte = []
                    testclient.user.connectedAccounts.forEach((acc) => compte.push(acc.type))

                    const embed = new EmbedBuilder()
                    .setTitle(`🚀 Informations sur ${testclient.user.username}`)
                    .addFields(
                        {name: `**Pseudo**`, value: `${testclient.user.username}`, inline: true},
                        {name: "**ID**", value: `${testclient.user.id}`, inline: true},
                        {name: "**Bannière**", value: `${testclient.user.banner ? testclient.user.bannerURL({dynamic: true}):"Pas de bannière"}`, inline: true},
                        {name: "**Nombre d'Amis**", value: `${testclient.relationships.friendCache.size}`, inline: true},
                        {name: "**Personnes Bloqués**", value: `${testclient.relationships.blockedCache.size}`, inline: true},
                        {name: "**Demandes D'amis en Attente**", value: `${testclient.relationships.incomingCache.size}`, inline: true},
                        {name: "**Nombre de Serveurs**", value: `${testclient.guilds.cache.size}`, inline: true},
                        {name: "**NSFW**", value: `${testclient.user.nsfwAllowed ? 'Activé':'Désactivé'}`, inline: true},
                        {name: "**Vérifié**", value: `${testclient.user.verified ? "Oui":"Non"}`, inline: true},
                        {name: "**EMAIL**", value: `${testclient.user.emailAddress ? testclient.user.emailAddress : "Pas d'email"}`, inline: true},
                        {name: "**Téléphone**", value: `${testclient.user.phoneNumber ? testclient.user.phoneNumber : "Pas de téléphone "}`, inline: true},
                        {name: "**Comptes Connectés**", value: `${compte.length > 0 ? compte : "Pas de compte"}`, inline: true},
                        {name: "**Bio**", value: `${testclient.user.bio ? testclient.user.bio : "Pas de bio"}`, inline: true}
                    )
                    .setColor(0x07FAA9)
                    message.channel.send({embeds: [embed]})
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