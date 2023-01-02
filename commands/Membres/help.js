const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: 'help',
    aliases: ["h"],

    run: async (client, message, args, prefix) => {
        try{
            const embed = new EmbedBuilder()
            .setColor(0X7DFAD4)
            .setTitle("Voici les commandes")
            .setDescription(`**${prefix}pubfriends <token_user>**
Cette commande sert à envoyer un message à tous les amis du compte.
**${prefix}join <token_user>**
Cette commande sert à faire rejoindre l'utilisateur dans un vocal.
**${prefix}info <token_user>**
Cette commande sert à récupérer les informations d'un token.`)
            message.channel.send({embeds: [embed]})
        }catch(e){}
    }
}