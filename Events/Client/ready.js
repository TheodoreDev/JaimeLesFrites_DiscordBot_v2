const {loadCommands} = require("../../Handlers/commandHandler")

module.exports = {
    name: "ready",
    once: true,

    execute(client) {
        console.log(`${client.user.username} is online !`);
        client.user.setActivity(`${client.guilds.cache.size} Guilds`);

        loadCommands(client);
    }
}