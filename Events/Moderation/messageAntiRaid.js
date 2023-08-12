const { Message, Client, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "messageCreate",

    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     * @returns
     */
    async execute(message, client) {
        if(message.author.bot) return;

        /*if(message.member.roles.cache.has("1137411181485768824")) return;*/

        if(message.content.includes("https://") || message.content.includes("discord.gg") || message.content.includes("http://")){
            await message.delete()
            return message.channel.send({
                content: `${message.author}, vous n'avez pas le droit de poster ce genre de lien 🍟 !!`
            }).then((msg) => {
                setTimeout(() => msg.delete(), 10000)
            })
            
        }
    }
}