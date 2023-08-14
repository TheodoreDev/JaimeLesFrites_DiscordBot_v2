const {Client, GatewayIntentBits, Partials, Collection} = require("discord.js");
const {Guilds, GuildMembers, GuildMessages, MessageContent} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember} = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
    partials: [User, Message, GuildMember, ThreadMember],
});

const {loadEvents} = require("./Handlers/eventHandler");
const {connect, Promise} = require("mongoose");
client.config = require("./config.json");

connect(client.config.dbURL, {

}).then(() => console.log(`${client.user.username} is now connected to the database.`))

client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();
client.badWords = new Collection();

loadEvents(client)

client.login(client.config.token)