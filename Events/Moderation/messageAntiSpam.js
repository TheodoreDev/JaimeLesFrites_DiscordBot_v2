const { Message, Client, PermissionFlagsBits } = require("discord.js");
const AntiSpam = require("discord-anti-spam");

const User = new Map()

module.exports = {
    name: "messageCreate",

    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     * @returns
     */
    async execute(message, client) {
        
        if(User.get(message.author.id)) {
            const data = User.get(message.author.id)
            let dif = message.createdTimestamp - data.lastMessage.createdTimestamp;
            let count = data.msgCount;

            if(dif > 3000) {
                clearTimeout(data.timer);
                data.msgCount = 1;
                data.lastMessage = message;

                data.timer = setTimeout(() => {
                    User.delete(message.author.id)
                }, 10000);

                User.set(message.author.id, data)
            } else {
                data.msgCount ++;
                if(data.msgCount > 7) {
                    
                }
            }
        }
        
    }
}