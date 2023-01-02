const { ModalBuilder, TextInputBuilder, TextInputStyle, ApplicationCommandType, ActionRowBuilder } = require("discord.js")
module.exports = {
  name: "pubfriends",
  description: "Envoie un message à tous les amis d'un token",
  usage: "/pubfriends",
  category: "Membres",
	userPerms: [""],
	botPerms: [""],
	cooldown: 0,
  guildOnly: true,
  maintenance: false,
	type: ApplicationCommandType.ModalSubmit,
	run: async (client, interaction) => {
    try{
    
        if (!interaction.member.roles.cache.some(role => role.id === client.config.wlrole)) return interaction.reply({content: "Tu n'es pas wl", ephemeral: true})
        const modal = new ModalBuilder() .setCustomId(`pub-modal`).setTitle(`PubFriends`);
      const tok = new TextInputBuilder() .setCustomId('msg-token').setLabel('Token de l\'utilisateur').setStyle(TextInputStyle.Short).setMinLength(1).setPlaceholder('Entre le token ici...').setRequired(true);
      const input = new TextInputBuilder() .setCustomId('msg-friend').setLabel('Message à envoyer à tous les amis du compte').setStyle(TextInputStyle.Paragraph).setMinLength(1).setPlaceholder('Message à envoyer ici...').setRequired(true);
      const firstActionRow = new ActionRowBuilder().addComponents(input);
      const SecondActionRow = new ActionRowBuilder().addComponents(tok);
      modal.addComponents(SecondActionRow, firstActionRow);
      await interaction.showModal(modal);
    } catch(error){
      console.log(error);
    }
  },
};