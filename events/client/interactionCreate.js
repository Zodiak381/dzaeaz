const { InteractionType, ActionRowBuilder, ButtonBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js')

const { Client } = require('discord.js-selfbot-v13')

module.exports = async (client, interaction) => {
    try{

        if (!interaction.guild) return await interaction.reply({ephemeral: true,content: `Mes commande sont utilisables uniquement dans des serveurs!`})
        const slashCommand = client.slashCommands.get(interaction.commandName);
        if (!slashCommand) return client.slashCommands.delete(interaction.commandName);
        if (slashCommand.maintenance) return await interaction.reply({ephemeral: true,content: `**la commande ${slashCommand.name} est en __Maintenance__** ressaie plus tard!`})
        await slashCommand.run(client, interaction);
}catch(e){
    console.log(e)
}
}