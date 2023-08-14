const { PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const {loadCommands} = require("../../Handlers/commandHandler");
const { loadBadWord } = require("../../Handlers/badWordHandler");

module.exports = {
    name: "ready",
    once: true,

    execute(client) {
        console.log(`${client.user.username} is online !`);
        client.user.setActivity(`${client.guilds.cache.size} Guilds`);

        loadBadWord(client)
        loadCommands(client);
    }
}