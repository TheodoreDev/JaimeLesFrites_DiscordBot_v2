const { PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const {loadCommands} = require("../../Handlers/commandHandler");
const AntiSpam = require("discord-anti-spam");

module.exports = {
    name: "ready",
    once: true,

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        console.log(`${client.user.username} is online !`);
        client.user.setActivity(`${client.guilds.cache.size} Guilds`);

        loadCommands(client);

        const antiSpam = new AntiSpam({
            warnThreshold: 20,
            muteTreshold: 40,
            unMuteTime: 1440,
            verbose: false,
            removeMessages: true,
            ignoredPermissions: [PermissionFlagsBits.ManageMessages],
          });
          

        client.on("messageCreate", (message) => antiSpam.message(message));
    }
}