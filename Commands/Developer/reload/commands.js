const { ChatInputCommandInteraction, Client } = require("discord.js");
const {loadCommands} = require("../../../Handlers/commandHandler");

module.exports = {
    subCommand: "reload.commands",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        loadCommands(client);
        await interaction.reply({content: "Reloaded commands !", ephemeral: true});
    }
}