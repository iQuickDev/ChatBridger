const telegramClient = require('node-telegram-bot-api')

module.exports = class TelegramHandler {
    client

    constructor() {
        this.client = new telegramClient(process.env.TELEGRAM_TOKEN, {
            polling: true
        })

        this.client.on('message', (msg) => {
            console.log(msg)
        })
    }
}