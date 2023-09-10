const { Message, Client, PermissionFlagsBits } = require("discord.js");
const BadWordsConfiguration = require("../../Schemas/BadWordsConfiguration")

module.exports = {
    name: "messageCreate",

    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     * @returns
     */
    async execute(message, client) {

        let badWordsGuild = await BadWordsConfiguration.findOne({guildId: message.guildId});
        if(!badWordsGuild){
            badWordsGuild = new BadWordsConfiguration({guildId: message.guildId});
        };

        let badWordArray = badWordsGuild.badWordsArray

        try {
            if(message.author.bot) return;

            if(message.content.includes("youtu.be") 
                || message.content.includes("spotify.com") 
                || message.content.includes("discord.gg") 
                || message.content.includes("http://") 
                || message.content.includes(".exe")
            )

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

            badWordArray.forEach(badWord => {
                if(message.content.includes(`${badWord}`)) {
                    if(message.member.roles.cache.has("1137411181485768824") || message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
                        return;
                    } else {
                        message.delete()
                        return message.channel.send({
                            content: `${message.author}, you'are not allowed to post this type of message !!`
                        }).then((msg) => {
                            setTimeout(() => msg.delete(), 10000)
                        })
                    }
                }
            });

        } catch (error) {
            console.log(error)
        }
        
    }
}