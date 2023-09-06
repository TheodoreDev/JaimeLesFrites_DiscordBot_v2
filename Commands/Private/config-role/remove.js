const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const MembersAutorisation = require("../../../Schemas/MembersAutorisation");


module.exports = {
    subCommand: "config-member.remove",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {

        const member = interaction.options.getUser("memberid").username;

        let memberAutorisation = await MembersAutorisation.findOne({MemberAutorised: `${member}-${interaction.guildId}`});

        if(!memberAutorisation){
            await interaction.reply({
                content: `${member} is already not allowed to use command`,
                ephemeral: true
            });
            return;
        };

        memberAutorisation = await MembersAutorisation.findOneAndDelete({MemberAutorised: `${member}-${interaction.guildId}`})

        await interaction.reply({
            content: `Removed ${member} for use command`,
            ephemeral: true
        });
        return;
    }
}