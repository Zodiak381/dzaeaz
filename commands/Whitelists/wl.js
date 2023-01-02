const { PermissionsBitField, EmbedBuilder } = require("discord.js")

module.exports = {
    name: 'wl',
    aliases: ["whitelist"],

    run: async (client, message, args, prefix) => {
        try{

            if (!client.config.wl.includes(message.author.id)) return;

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await message.guild.members.fetch(args[0])
            if (!member) return message.reply(`Aucun membre du serveur de trouvé pour \`${args[0] || "rien"}\``)

            const channel = await message.guild.channels.create({
                name: `${member.user.username}`,
                type: 0,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: message.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                ]
           })  

           const embed = new EmbedBuilder()
           .setDescription(`✅ ${member.username} a obtenu l'accès à EpicTool`)
           .setColor(0x07FAA9)
           message.channel.send({embeds: [embed]})

           if (client.config.wlrole){
            const role = await message.guild.roles.cache.get(client.config.wlrole)
            if (role) member.roles.add(role)
           }

           const embed1 = new EmbedBuilder()
           .setColor(0X7DFAD4)
           .setTitle(`Bienvenue dans votre salon privé, ${member.user.username}`)
           .setDescription(`Vous disposez maintenant de votre propre salon privé pour faire des publicités avec EpicSponsor !
           Rappelez-vous que vous devez avoir un ou plusieurs tokens de bot pour utiliser EpicSponsor, si vous n'avez pas encore de token, adressez-vous à un helper pour en savoir plus ou rendez vous [ici](https://discord.com/developers/applications) pour créer un token.`)
           if (client.config.customimg) embed1.setImage(client.config.customimg)

           const embed2 = new EmbedBuilder()
           .setColor(0X7DFAD4)
           .setTitle("Voici les commandes")
           .setDescription(`**${prefix}pubfriends <token_user>**
Cette commande sert à envoyer un message à tous les amis du compte.
**${prefix}join <token_user>**
Cette commande sert à faire rejoindre l'utilisateur dans un vocal.
**${prefix}info <token_user>**
Cette commande sert à récupérer les informations d'un token.`)
           channel.send({embeds: [embed1]})
           channel.send({embeds: [embed2]})          

        }catch(e){
            console.log(e)
            message.reply(`Aucun membre du serveur de trouvé pour \`${args[0] || "rien"}\``).catch(() => false)
        }
    }
}