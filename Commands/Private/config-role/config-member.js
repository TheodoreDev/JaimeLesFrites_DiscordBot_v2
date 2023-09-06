const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, ChannelType } = require("discord.js");
const RoleConfiguration = require("../../../Schemas/MembersAutorisation");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("config-member")
    .setDescription("Configure member.")
    .setDMPermission(false)
    .addSubcommand((subcommand) => subcommand
        .setName("add")
        .setDescription("Add a member who can use commands.")
        .addUserOption((option) => option
            .setName("memberid")
            .setDescription("The member you want to add")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) => subcommand
        .setName("remove")
        .setDescription("Remove a member who can use commands.")
        .addUserOption((option) => option
            .setName("memberid")
            .setDescription("The member you want to remove")
            .setRequired(true)
        )
    ),
}