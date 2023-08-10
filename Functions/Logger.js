const fs = require("fs")

async function logger(Status, interaction){
    const logData = `[${Date().substring(0, 24)}]:[${Status}] : "${interaction.commandName}" command ==> {${interaction.user.id} > ${interaction.user.username}} in {${interaction.guild} > ${interaction.guildId}}, message : ${interaction.id};\n`;

    fs.writeFile("Logs/logs.txt", logData, {flag: 'a'}, err => {
        if(err) {
            console.log(err);
        }
    })
}

module.exports = {
    logger
}