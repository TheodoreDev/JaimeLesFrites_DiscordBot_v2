const { Schema, model } = require("mongoose");

const membersAutorisationSchema = new Schema({
    MemberAutorised: String,
})

module.exports = model('MembersAutorisation', membersAutorisationSchema);