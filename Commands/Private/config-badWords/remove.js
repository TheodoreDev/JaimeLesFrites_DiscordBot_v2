const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const BadWordsConfiguration = require("../../../Schemas/BadWordsConfiguration")

module.exports = {
    subCommand: "config-badwords.remove",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction){

        let badWordsArrayInput = []
        const badWordsInput = interaction.options.getString("bad-words")

        badWordsInput.split("-").forEach(badWord => {
            badWordsArrayInput.push(badWord)
        });

        let badWordsGuild = await BadWordsConfiguration.findOne({guildId: interaction.guildId});
        if(!badWordsGuild){
            badWordsGuild = new BadWordsConfiguration({guildId: interaction.guildId});
        };

        badWordsArrayInput.forEach(badWord => {
            if(badWordsGuild.badWordsArray.includes(`${badWord}`)){
                badWordsGuild.badWordsArray = badWordsGuild.badWordsArray.filter(
                    (badword) => badword !== badWord
                )
            }
        })
        await badWordsGuild.save()
        interaction.reply({
            content: "Your words were well remove.",
            ephemeral: true
        })
    }
}