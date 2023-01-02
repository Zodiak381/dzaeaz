module.exports = async (client, message) => {
    try{
        if (!message.guild) return;
        if (message.author.bot) return;

        let prefix = client.config.prefix || "."

        // Si le bot est ping
        if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)) !== null) {
                // return message.channel.send(`Mon prefix : \`${prefix}\``)
            }

        // Args
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [, matchedPrefix] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Lancement des commandes
        let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return undefined
        if (command) command.run(client, message, args, prefix);

    }catch(e){
        console.log(e)
    }
}