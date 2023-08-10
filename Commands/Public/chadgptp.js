const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const {Configuration, OpenAIApi} = require("openai");
const config = require("../../config.json");

const configuration = new Configuration({
    apiKey: config.openAIapi
});

const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
    .setName("chadgptp")
    .setDescription("Ask Chad GPTP a question.")
    .setDMPermission(true)
    .addStringOption(options => options
        .setName("request")
        .setDescription("What do you asking for.")
        .setRequired(true)
    ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {

        await interaction.deferReply({ephemeral: true})
        const question = interaction.options.getString("request")

        try {
            const res = await openai.createCompletion({
                model: "gpt-3.5-turbo",
                max_tokens: 2048,
                temperature: 1,
                prompt: question
            })

            const embed = new EmbedBuilder()
            .setColor('Blue')
            .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

            await interaction.editReply({
                embeds: [embed],
                ephemeral: true
            })
        } catch(e) {
            console.log(`Request failed [Status] : ${e.response.status}`)
            return await interaction.editReply({content: `Request failed [Status] : ${e.response.statusText}`, ephemeral: true})
        }
    }
}