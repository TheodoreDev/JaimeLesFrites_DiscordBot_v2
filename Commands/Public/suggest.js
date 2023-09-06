const { SlashCommandBuilder, ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits} = require("discord.js");
const GuildConfiguration = require("../../Schemas/GuildConfiguration");
const Suggestion = require("../../Schemas/Suggestion");
const formatResults = require("../../Functions/formatResults");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Create a suggestion.")
    .setDMPermission(false),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        try {
            const guildConfiguration = await GuildConfiguration.findOne({guildId: interaction.guildId});
            if(!guildConfiguration?.suggestionChannelIds.length) {
                await interaction.reply({
                    content: "This server has not been configured to use suggestion yet",
                    ephemeral: true,
                });
                return;
            };

            if(!guildConfiguration.suggestionChannelIds.includes(interaction.channelId)){
                await interaction.reply({
                    content: "This channel is not configured to use suggestion. Go on" + `${guildConfiguration.suggestionChannelIds.map((id) => `<#${id}>`).join(', ')}`,
                    ephemeral: true
                });
                return;
            }
            const modal = new ModalBuilder()
            .setTitle("Create a suggestion.")
            .setCustomId(`suggestion-${interaction.user.id}`);

            const textInput = new TextInputBuilder()
            .setCustomId("suggestion-input")
            .setLabel("What would you like to suggest ?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setMaxLength(1000);

            const actionRow = new ActionRowBuilder()
            .addComponents(textInput);
            modal.addComponents(actionRow);

            await interaction.showModal(modal);

            const filter = (i) => i.customId === `suggestion-${interaction.user.id}`

            const modalInteraction = await interaction.awaitModalSubmit({
                filter,
                time: 1000 * 60 * 3
            }).catch((error) => console.log(error));

            await modalInteraction.deferReply({ephemeral: true});
            let suggestionMessage;

            try {
                suggestionMessage = await interaction.channel.send('Creating suggestion, please wait...')
            } catch (error) {
                modalInteraction.editReply({
                    content: "Failed to create suggestion message in this channel.",
                    ephemeral: true
                });
                return;
            }

            const suggestionText = modalInteraction.fields.getTextInputValue("suggestion-input");
            const newSuggestion = new Suggestion({
                authorId: interaction.user.id,
                guildId: interaction.guildId,
                messageId: suggestionMessage.id,
                content: suggestionText,
            });
            await newSuggestion.save();

            modalInteraction.editReply({
                content: "Suggestion created",
                ephemeral: true,
            });

            const suggestionEmbed = new EmbedBuilder()
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({size: 256})})
            .addFields([
                {name: "Suggestion", value: suggestionText},
                {name: "Status", value: "⌛ Pending"},
                {name: "Votes", value: formatResults()}
            ])
            .setColor('Yellow');

            const upvoteButton = new ButtonBuilder()
            .setEmoji('👍')
            .setLabel("Upvote")
            .setStyle(ButtonStyle.Primary)
            .setCustomId(`suggestion.${newSuggestion.suggestionId}.upvote`);
            const downvoteButton = new ButtonBuilder()
            .setEmoji('👎')
            .setLabel("Downvote")
            .setStyle(ButtonStyle.Primary)
            .setCustomId(`suggestion.${newSuggestion.suggestionId}.downvote`);

            const approveButton = new ButtonBuilder()
            .setEmoji("✅")
            .setLabel("Approve")
            .setStyle(ButtonStyle.Success)
            .setCustomId(`suggestion.${newSuggestion.suggestionId}.approve`);
            const rejectButton = new ButtonBuilder()
            .setEmoji("🛑")
            .setLabel("Reject")
            .setStyle(ButtonStyle.Danger)
            .setCustomId(`suggestion.${newSuggestion.suggestionId}.reject`);

            const firstRow = new ActionRowBuilder().addComponents(upvoteButton, downvoteButton);
            const secondRow = new ActionRowBuilder().addComponents(approveButton, rejectButton);

            suggestionMessage.edit({
                content: `${interaction.user} Suggestion created !`,
                embeds: [suggestionEmbed],
                components: [firstRow, secondRow],
            })

            var winner = ""
            const suggestionNewEmbed = new EmbedBuilder()
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({size: 256})})
            .addFields([
                {name: "Suggestion", value: suggestionText},
                {name: "Winner", value: winner},
            ])

            setTimeout(() => {
                if (formatResults.upPercentage > formatResults.downPercentage){
                    winner = "upvote"
                }else if (formatResults.downPercentage > formatResults.upPercentage){
                    winner = "downVote"
                } else {
                    winner = "no winner"
                }
                suggestionMessage.edit({
                    content: "@everyone , suggestion close",
                    embeds: [suggestionNewEmbed],
                    components: []
                })
            }, 10000)
        } catch (error) {
            console.log(`Error in /suggest: ${error}`)
        }
    }
}