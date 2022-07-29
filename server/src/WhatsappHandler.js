const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const DatabaseManager = require('./DatabaseManager')
const { io } = require('socket.io-client')

module.exports = class WhatsappHandler {
    client
    socket
    group

    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: { handleSIGINT: false }
        })

        this.socket = io(`http://127.0.0.1:${process.env.SOCKET_PORT}`).connect()

        this.client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true })
        })

        this.client.on('ready', () => {
            console.log('Whatsapp client is ready')
            this.group = DatabaseManager.get('whatsappGroup')
            if (!this.group)
                console.log('No whatsapp group set')
        })

        this.client.on('message_create', async (msg) => {
            if (msg.body === `${process.env.PREFIX}getid`) {
                msg.getChat().then(chat => {
                    if (chat.isGroup) {
                        msg.reply(`Group ID: ${chat.id._serialized}`)
                    }
                    else
                        msg.reply('This chat is not a group, therefore it cannot be bridged')
                })
            }
            else {
                if ((await msg.getChat()).id._serialized == this.group) {
                    this.socket.emit('message',
                        {
                            platform: 'whatsapp',
                            message: msg.body,
                            author: msg['_data'].notifyName
                        })
                }
            }
        })

        process.on('SIGINT', () => {
            this.client.destroy()
            process.exit(0)
        })

        this.client.initialize()
    }

    init(id) {
        DatabaseManager.set('whatsappGroup', id)
        this.group = id
    }

    send(message) {
        if (this.group)
            this.client.sendMessage(this.group, message)
    }

}