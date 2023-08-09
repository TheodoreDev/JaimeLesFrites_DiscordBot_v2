const { SlashCommandBuilder } = require("discord.js");
const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
    .setName("chadGPTP")
}