async function loadBadWord(client) {

    let badWordsArray = [
        "Fuck",
        "Pute"
    ];

    await client.badWords.clear()

    client.application.badWords.set(badWordsArray)
    console.log(client.badWords)
}

module.exports = {
    loadBadWord
}