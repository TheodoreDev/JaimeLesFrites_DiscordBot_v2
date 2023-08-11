const { Schema, model } = require("mongoose");
const {randomUUID} = require("crypto");
const { timeStamp } = require("console");

const suggestionSchema = new Schema({
    suggestionId: {
        type: String,
        default: randomUUID,
    },
    authorId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    messageId: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
    upvote: {
        type: [String],
        default: []
    },
    downvote: {
        type: [String],
        default: []
    },
}, {timeStamp: true});

module.exports = model('Suggestion', suggestionSchema);