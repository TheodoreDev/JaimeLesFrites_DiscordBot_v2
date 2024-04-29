const {SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits} = require("discord.js");
const BadWordsConfiguration = require("../../Schemas/BadWordsConfiguration");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("show-bad-words")
    .setDescription("See the bad words registered.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction){
        const targetGuild = await BadWordsConfiguration.findOne({guildId: interaction.guildId})
        if(!targetGuild){
            targetGuild = new BadWordsConfiguration({guildId: interaction.guildId});
        };

        interaction.reply({
            content: `The bad words in ${interaction.guild.name} are [${targetGuild.badWordsArray}]`,
            ephemeral: true
        })
    }
}