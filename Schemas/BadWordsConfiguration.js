const { Schema, model} = require("mongoose");

const badWordsConfigurationSchema = new Schema({
    guildId : {
        type: String,
        required: true,
    },
    badWordsArray : {
        type: [String],
        default: []
    }
});

module.exports = model("BadWordsConfiguration", badWordsConfigurationSchema)