const { Interaction } = require("discord.js");
const Suggestion = require("../../Schemas/Suggestion");
const formatResults = require("../../Functions/formatResults");

module.exports = {
    name: "interactionCreate",

    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton() || !interaction.customId) return;

        try {
            const [type, suggestionId, action] = interaction.customId.split('.');
            if(!type || !suggestionId || !action) return;
            if(type !== "suggestion") return;

            await interaction.deferReply({ephemeral: true});

            const targetSuggestion = await Suggestion.findOne({suggestionId});
            const targetMessage = await interaction.channel.messages.fetch(targetSuggestion.messageId);
            const targetMessageEmbed = targetMessage.embeds[0];

            if(action === "approve") {
                if(!interaction.memberPermissions.has('ModerateMembers')){
                    await interaction.editReply({
                        content: "You're not allowed to approve suggestion.",
                        ephemeral: true,
                    });
                    return;
                }
                targetSuggestion.status = "approved";
                targetMessageEmbed.data.color = 0x84e660;
                targetMessageEmbed.fields[1].value = "✅ Approved";
                await targetSuggestion.save();
                interaction.editReply({
                    content: "Suggestion approved !",
                    ephemeral: true,
                });
                targetMessage.edit({
                    embeds: [targetMessageEmbed],
                    components: [targetMessage.components[0]]
                });
                return;
            }
            if(action === "reject") {
                if(!interaction.memberPermissions.has('ModerateMembers')){
                    await interaction.editReply({
                        content: "You're not allowed to reject suggestion.",
                        ephemeral: true,
                    });
                    return;
                }

                targetSuggestion.status = "reject";
                targetMessageEmbed.data.color = 0xff6161;
                targetMessageEmbed.fields[1].value = "🛑 reject";
                await targetSuggestion.save();
                interaction.editReply({
                    content: "Suggestion rejected !",
                    ephemeral: true,
                });
                targetMessage.edit({
                    embeds: [targetMessageEmbed],
                    components: [targetMessage.components[0]]
                });
                return;
            }
            if(action === "upvote") {
                const hasVoted = targetSuggestion.upvote.includes(interaction.user.id) || targetSuggestion.downvote.includes(interaction.user.id);

                if(hasVoted){
                    await interaction.editReply({
                        content: "You have already voted !",
                        ephemeral: true,
                    });
                    return;
                }

                targetSuggestion.upvote.push(interaction.user.id);
                await targetSuggestion.save()
                interaction.editReply({
                    content: "Upvoted !",
                    ephemeral: true,
                });
                targetMessageEmbed.fields[2].value = formatResults(
                    targetSuggestion.upvote,
                    targetSuggestion.downvote,
                );
                targetMessage.edit({
                    embeds: [targetMessageEmbed],
                });
                return;
            }

            if(action === "downvote") {
                const hasVoted = targetSuggestion.upvote.includes(interaction.user.id) || targetSuggestion.downvote.includes(interaction.user.id);

                if(hasVoted){
                    await interaction.editReply({
                        content: "You have already voted !",
                        ephemeral: true,
                    });
                    return;
                }

                targetSuggestion.downvote.push(interaction.user.id);
                await targetSuggestion.save()
                interaction.editReply({
                    content: "Downvoted !",
                    ephemeral: true,
                });
                targetMessageEmbed.fields[2].value = formatResults(
                    targetSuggestion.upvote,
                    targetSuggestion.downvote,
                );
                targetMessage.edit({
                    embeds: [targetMessageEmbed],
                });
                return;
            }
        } catch (error) {
            console.log(`Error in suggestButton.js ${error}`)
        }
    }
}