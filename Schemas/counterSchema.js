const {Schema, SchemaTypes, model} = require("mongoose");

module.exports = model("votedMembers", new Schema({
    User: String
}))