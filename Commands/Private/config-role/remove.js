const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const RolesAutorisation = require("../../../Schemas/RolesAutorisation");


module.exports = {
    subCommand: "config-role.remove",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        let roleConfiguration = await RolesAutorisation.findOne({guildId: interaction.guildId});

        if(!roleConfiguration){
            roleConfiguration = new RolesAutorisation({guildId: interaction.guildId});
        };

        const role = interaction.options.getString("roleid");
        if(!roleConfiguration.roleId.includes(role)){
            await interaction.reply({
                content: `${role} is already disallowed to use command`,
                ephemeral: true
            });
            return;
        };

        roleConfiguration.roleId = roleConfiguration.roleId.filter(
            (id) => id !== role
        )
        await roleConfiguration.save()

        await interaction.reply({
            content: `Remove ${role} for use command`,
            ephemeral: true
        });
        return;
    }
}