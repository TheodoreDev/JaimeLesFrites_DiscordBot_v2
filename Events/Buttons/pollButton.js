const { ButtonInteraction } = require("discord.js");
const DataBase = require("../../Schemas/counterSchema");

module.exports = {
    name: "interactionCreate",

    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;

        const splittedArray = interaction.customId.split('-');
        if(splittedArray[0] !== "Poll") return;

        let votedMembers = await DataBase.findOne({User: `${interaction.user.id}-${interaction.message.id}`})

        if(votedMembers)
        return interaction.reply({
            content: "Tu as déjà voté !",
            ephemeral: true
        });

        votedMembers = await DataBase.create({User: `${interaction.user.id}-${interaction.message.id}`});

        const pollEmbed = interaction.message.embeds[0];
        if(!pollEmbed)
        return interaction.reply({
            content: "Contact Developer : enable to find embed.",
            ephemeral: true
        });

        const yesField = pollEmbed.fields[0];
        const noField = pollEmbed.fields[1];
        const thirdField = pollEmbed.fields[2];
        const fourthField = pollEmbed.fields[3];

        const VoteCountedReply = "À voté";

        switch(splittedArray[1]) {
            case "1" : {
                const newYesCount = parseInt(yesField.value) + 1;
                yesField.value = newYesCount;
                interaction.reply({content: VoteCountedReply, ephemeral: true});
                interaction.message.edit({embeds: [pollEmbed]});
            }
            break;
            case "2" : {
                const newNoCount = parseInt(noField.value) + 1;
                noField.value = newNoCount;
                interaction.reply({content: VoteCountedReply, ephemeral: true});
                interaction.message.edit({embeds: [pollEmbed]});
            }
            break;
            case "3" : {
                const newThirdCount = parseInt(thirdField.value) + 1;
                thirdField.value = newThirdCount;
                interaction.reply({content: VoteCountedReply, ephemeral: true});
                interaction.message.edit({embeds: [pollEmbed]});
            }
            break;
            case "4" : {
                const newFourthCount = parseInt(fourthField.value) + 1;
                fourthField.value = newFourthCount;
                interaction.reply({content: VoteCountedReply, ephemeral: true});
                interaction.message.edit({embeds: [pollEmbed]});
            }
            break;
        }
    }
}