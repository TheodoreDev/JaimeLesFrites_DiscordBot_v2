const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const BadWordsConfiguration = require("../../../Schemas/BadWordsConfiguration")

module.exports = {
    subCommand: "config-badwords.add",

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
        console.log(badWordsArrayInput)

        let badWordsGuild = await BadWordsConfiguration.findOne({guildId: interaction.guildId});
        if(!badWordsGuild){
            badWordsGuild = new BadWordsConfiguration({guildId: interaction.guildId});
        };

        badWordsArrayInput.forEach(badWord => {
            badWordsGuild.badWordsArray.forEach(badWordRegistered => {

                if(badWordRegistered === badWord){
                    interaction.reply({
                        content: `The word "${badWord}" is already registered.`,
                        ephemeral: true
                    })
                    return;
                }else {
                    badWordsGuild.badWordsArray.push(badWord)
                }
            })
            

        })
        await badWordsGuild.save()
        await interaction.reply({
            content: "Your words were well register",
            ephemeral: true
        })
    }
}