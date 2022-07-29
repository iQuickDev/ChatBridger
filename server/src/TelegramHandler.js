const telegramClient = require('node-telegram-bot-api')
const io = require('socket.io-client')
const DatabaseManager = require('./DatabaseManager')

module.exports = class TelegramHandler {
    client
    socket
    group

    constructor() {
        this.client = new telegramClient(process.env.TELEGRAM_TOKEN)

        this.group = DatabaseManager.get('telegramGroup')

        this.socket = io(`http://127.0.0.1:${process.env.SOCKET_PORT}`).connect()

        this.client.onText(/\/getid/, (msg) => {
            this.client.sendMessage(msg.chat.id, `Chat ID: ${msg.chat.id}`)
        })

        this.client.on('message', (msg) => {
            console.log(msg)
            if (msg.chat.id == this.group) {
                this.socket.emit('message',
                    {
                        platform: 'telegram',
                        message: msg.text,
                        author: msg.from.username
                    })
            }
        })
    }

    send(message) {
        if (this.group)
        this.client.sendMessage(this.group, message)
    }
}