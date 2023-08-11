const {ChatInputCommandInteraction} = require("discord.js")
const {logger} = require("../../Functions/Logger")

module.exports = {
    name: "interactionCreate",
    
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction     
     */
    execute(interaction, client) {
        if(!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if(!command)
        return interaction.reply({
            content: "This command is outdated.",
            ephemeral: true,
        });

        if(command.developer && interaction.user.id !== "945595950984986664" && interaction.user.id !== "592399930350370855")
        return interaction.reply({
            content: "This command is only for dev.",
            ephemeral: true,
        });

        const subCommand = interaction.options.getSubcommand(false);
        if(subCommand){
            const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);
            if(!subCommandFile)
            return interaction.reply({
                content: "This sub command is outdated.",
                ephemeral: true,
            });
            
            subCommandFile.execute(interaction, client);
            logger('Succes', interaction)

        } else {
            command.execute(interaction, client);
            logger('Succes', interaction)
            
        }
    }
};