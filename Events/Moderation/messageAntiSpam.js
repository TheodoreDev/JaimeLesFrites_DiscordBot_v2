const { Message, PermissionFlagsBits } = require("discord.js");

const User = new Map()

module.exports = {
    name: "messageCreate",

    /**
     * 
     * @param {Message} message 
     */
    async execute(message) {
        if(message.member.permissions.has(PermissionFlagsBits.ManageMessages)) return;
        
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
                count ++;
                if(count > 10) {
                
                    const messages = [...(await message.channel.messages.fetch({before: message.id}))
                        .filter(m => m.author.id === message.author.id)
                        .values()]
                        .slice(0, 14);

                    await message.channel.bulkDelete(messages);

                    await message.channel.send(`${message.author} was mute for spamming !`)
                    .then((msg) => {
                        setTimeout(() => msg.delete(), 10000)
                    })
                    await message.member.timeout(86400000, "Spam")
                } else {
                    data.msgCount = count;
                    User.set(message.author.id, data);

                    await message.channel.send(`${message.author}, stop spamming like a "Frite 🍟"`)
                    .then((msg) => {
                        setTimeout(() => msg.delete(), 10000)
                    })
                }
            }
        } else {
            let FN = setTimeout(() => {
                User.delete(message.author.id)
            }, 7200000);

            User.set(message.author.id, {
                msgCount: 1,
                lastMessage: message,
                timer: FN
            })
        }
        
    }
}