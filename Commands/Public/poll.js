const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a poll !")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Connect)
    .addStringOption(options => options
        .setName("question")
        .setDescription("Provide the topic of the poll.")
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName("choice1")
        .setDescription("Set the first choice.")
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName("choice2")
        .setDescription("Set the second choice.")
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName("choice3")
        .setDescription("Set the third choice.")
        .setRequired(false)
    )
    .addStringOption(options => options
        .setName("choice4")
        .setDescription("Set the fourth choice.")
        .setRequired(false)
    ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const pollQuestion = interaction.options.getString("question");
        const pollChoice1 = interaction.options.getString("choice1");
        const pollChoice2 = interaction.options.getString("choice2");
        const pollChoice3 = interaction.options.getString("choice3");
        const pollChoice4 = interaction.options.getString("choice4");

        const pollEmbed = new EmbedBuilder()
        .setDescription("**Question :**\n" + pollQuestion)
        .setImage("https://i.ibb.co/vxdBKFd/Untitled-1.gif")
        .addFields([
            {name: pollChoice1, value: "0", inline: true},
            {name: pollChoice2, value: "0", inline: true},
        ])
        .setColor([104, 204, 156]);

        if(pollChoice3) {
            pollEmbed.addFields([
                {name: pollChoice3, value: "0", inline: true},
            ])
        }
        if(pollChoice4) {
            pollEmbed.addFields([
                {name: pollChoice4, value: "0", inline: true},
            ])
        }

        const replyObject = await interaction.reply({embeds: [pollEmbed], fetchReply: true});

        const pollButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel(pollChoice1)
            .setCustomId(`Poll-1-${replyObject.id}`)
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setLabel(pollChoice2)
            .setCustomId(`Poll-2-${replyObject.id}`)
            .setStyle(ButtonStyle.Danger),
        )

        if(pollChoice3) {
            pollButtons.addComponents(
                new ButtonBuilder()
                .setLabel(pollChoice3)
                .setCustomId(`Poll-3-${replyObject.id}`)
                .setStyle(ButtonStyle.Secondary),
            )

            if(pollChoice4) {
                pollButtons.addComponents(
                    new ButtonBuilder()
                    .setLabel(pollChoice4)
                    .setCustomId(`Poll-4-${replyObject.id}`)
                    .setStyle(ButtonStyle.Secondary),
                )
                interaction.editReply({components: [pollButtons]});
            } else {
                interaction.editReply({components: [pollButtons]});
            }
        } else {
            interaction.editReply({components: [pollButtons]});
        }
    }
}