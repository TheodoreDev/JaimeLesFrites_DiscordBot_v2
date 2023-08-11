const { ChatInputCommandInteraction, ChannelType } = require("discord.js");
const GuildConfiguration = require("../../../Schemas/GuildConfiguration");

module.exports = {
    subCommand: "config-suggestion.remove",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        let guildConfiguration = await GuildConfiguration.findOne({guildId: interaction.guildId});

        if(!guildConfiguration){
            guildConfiguration = new GuildConfiguration({guildId: interaction.guildId});
        };

        const channel = interaction.options.getChannel("channel");
        if(!guildConfiguration.suggestionChannelIds.includes(channel.id)){
            await interaction.reply({
                content: `${channel} is not a suggestion channel`,
                ephemeral: true
            });
            return;
        }

        guildConfiguration.suggestionChannelIds = guildConfiguration.suggestionChannelIds.filter(
            (id) => id !== channel.id
        )
        await guildConfiguration.save();

        await interaction.reply({
            content: `Removed ${channel} from a suggestion channel`,
            ephemeral: true
        });
        return;
    }
}