const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("config-badwords")
    .setDescription("Set words forbidden")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addSubcommand((subcommand ) => subcommand
        .setName("add")
        .setDescription("Add a forbidden word.")
        .addStringOption((option) => option
            .setName("bad-words")
            .setDescription("bad words to add")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand ) => subcommand
        .setName("remove")
        .setDescription("Remove a forbidden word.")
        .addStringOption((option) => option
            .setName("bad-words")
            .setDescription("bad words to remove")
            .setRequired(true)
        )
    )
}