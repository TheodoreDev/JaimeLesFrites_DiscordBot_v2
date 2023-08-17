const { Schema, model } = require("mongoose");

const rolesAutorisationSchema = new Schema({
    guildId : {
        type: String,
        required: true
    },
    roleId : {
        type: String,
        required: true
    }
})

module.exports = model('RolesAutorisation', rolesAutorisationSchema);