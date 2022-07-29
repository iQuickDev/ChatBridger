const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const Database = require('./src/DatabaseManager').init()
const DiscordHandler = require('./src/DiscordHandler')
const WhatsappHandler = require('./src/WhatsappHandler')
const TelegramHandler = require('./src/TelegramHandler')
const SocketServer = require('./src/SocketServer')
const io = require('socket.io-client')

app.use(express.static('public'))
app.use(express.json())

let services = []

services.push(new WhatsappHandler())
if (process.env.DISCORD_TOKEN)
    services.push(new DiscordHandler())
if (process.env.TELEGRAM_TOKEN)
    services.push(new TelegramHandler())


let socketServer = new SocketServer()
let socket = io(`http://127.0.0.1:${process.env.SOCKET_PORT}`).connect()

socket.on('message', (msg) => {
    try {
        let formattedMsg = formatMessage(msg)
        if (!msg.message.includes('[discord]') &&
        !msg.message.includes('[telegram]') &&
        !msg.message.includes('[whatsapp]'))
        {
            switch (msg.platform) {
                case 'discord':
                    services.find(service => !(service instanceof DiscordHandler)).send(formattedMsg)
                    break
                case 'whatsapp':
                    services.find(service => !(service instanceof WhatsappHandler)).send(formattedMsg)
                    break
                case 'telegram':
                    services.find(service => !(service instanceof TelegramHandler)).send(formattedMsg)
                    break
            }
    
            console.log(msg)
        }
    }
    catch (error)
    {
        return
    }
})

function formatMessage(msg)
{
    return `[${msg.platform}] ${msg.author}: ${msg.message}`
}

app.post('/enable', (req, res) => {
    // todo
})

app.post('/disable', (req, res) => {
    // todo
})

app.listen(process.env.WEB_PORT || 5000, () => {
    console.log('Server is running')
})

// todo: media support