const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, ChannelType } = require("discord.js");
const RoleConfiguration = require("../../../Schemas/RolesAutorisation");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("config-role")
    .setDescription("Configure role.")
    .setDMPermission(false)
    .addSubcommand((subcommand) => subcommand
        .setName("add")
        .setDescription("Add a role who can use commands.")
        .addStringOption((option) => option
            .setName("roleid")
            .setDescription("The role you want to add")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) => subcommand
        .setName("remove")
        .setDescription("Remove a role who can use commands.")
        .addStringOption((option) => option
            .setName("roleid")
            .setDescription("The role you want to remove")
            .setRequired(true)
        )
    ),
}