const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, ChannelType } = require("discord.js");
const GuildConfiguration = require("../../../Schemas/GuildConfiguration");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("config-suggestion")
    .setDescription("Configure Suggestion.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addSubcommand((subcommand) => subcommand
        .setName("add")
        .setDescription("Add a suggestion chanel.")
        .addChannelOption((option) => option
            .setName("channel")
            .setDescription("The channel you want to add")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) => subcommand
        .setName("remove")
        .setDescription("Remove a suggestion chanel.")
        .addChannelOption((option) => option
            .setName("channel")
            .setDescription("The channel you want to remove")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    ),
}
