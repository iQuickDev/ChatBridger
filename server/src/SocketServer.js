const { Server } = require('socket.io')
const DiscordHandler = require('./DiscordHandler')
const WhatsappHandler = require('./WhatsappHandler')
const TelegramHandler = require('./TelegramHandler')

module.exports = class SocketServer
{
    io

    constructor()
    {
        this.io = new Server(process.env.SOCKET_PORT || 6000)

        this.io.on('connection', (socket) =>
        {
            console.log(socket.id + ' connected')

            socket.on('message', (msg) =>
            {
                console.log(msg)
                switch (msg.platform)
                {
                    case 'discord':
                        break
                    case 'whatsapp':
                        DiscordHandler.send(this.formatMessage(msg))
                        break
                    case 'telegram':
                        DiscordHandler.send(this.formatMessage(msg))
                        break
                }
            })
        })

        this.io.on('disconnect', (socket) =>
        {
            console.log(socket.id + ' disconnected')
        })
    }

    formatMessage(msg)
    {
        return `[${msg.platform}] ${msg.author}: ${msg.message}`
    }
}
