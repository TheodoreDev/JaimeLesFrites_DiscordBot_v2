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

        try {
            if(message.author.bot) return;

            if(message.content.includes("discord.gg") || message.content.includes("http://") || message.content.includes(loadBadWord()))

            if(message.member.roles.cache.has("1137411181485768824") || message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
                return;
            } else {
                await message.delete()
                return message.channel.send({
                    content: `${message.author}, you'are not allowed to post this type of message !!`
                }).then((msg) => {
                    setTimeout(() => msg.delete(), 10000)
                })
            }
        } catch (error) {
            console.log(error)
        }
        
    }
}