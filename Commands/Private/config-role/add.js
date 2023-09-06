const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const MembersAutorisation = require("../../../Schemas/MembersAutorisation");


module.exports = {
    subCommand: "config-member.add",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {

        const member = interaction.options.getUser("memberid").username;

        let memberAutorisation = await MembersAutorisation.findOne({MemberAutorised: `${member}-${interaction.guildId}`});

        if(memberAutorisation){
            await interaction.reply({
                content: `${member} is already allowed to use command`,
                ephemeral: true
            });
            return;
        };

        memberAutorisation = await MembersAutorisation.create({MemberAutorised: `${member}-${interaction.guildId}`})

        await interaction.reply({
            content: `Added ${member} for use command`,
            ephemeral: true
        });
        return;
    }
}