const { Message, Client, PermissionFlagsBits } = require("discord.js");
const AntiSpam = require("discord-anti-spam");

module.exports = {
    name: "messageCreate",

    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     * @returns
     */
    execute(message, client) {
        console.log("ok")
        const antiSpam = new AntiSpam({
            warnThreshold: 4,
            muteTreshold: 50,
            warnMessage: `@${message.author.username}, stop spamming like a "Frite 🍟"`,
            unMuteTime: 1440,
            verbose: false,
            removeMessages: true,
            ignoredPermissions: [PermissionFlagsBits.ManageMessages],
        });
        antiSpam
    }
}