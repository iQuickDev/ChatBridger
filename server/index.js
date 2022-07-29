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

let discord = new DiscordHandler()
let whatsapp = new WhatsappHandler()
let telegram = new TelegramHandler()
let socketServer = new SocketServer()
let socket = io(`http://127.0.0.1:${process.env.SOCKET_PORT}`).connect()

socket.on('message', (msg) => {
    let formattedMsg = formatMessage(msg)
    if (!msg.message.includes('[discord]') &&
    !msg.message.includes('[telegram]') &&
    !msg.message.includes('[whatsapp]'))
    {
        switch (msg.platform) {
            case 'discord':
                telegram.send(formattedMsg)
                whatsapp.send(formattedMsg)
                break
            case 'whatsapp':
                telegram.send(formattedMsg)
                discord.send(formattedMsg)
                break
            case 'telegram':
                whatsapp.send(formattedMsg)
                discord.send(formattedMsg)
                break
        }

        console.log(msg)
    }
})

function formatMessage(msg)
{
    return `[${msg.platform}] ${msg.author}: ${msg.message}`
}

app.listen(process.env.WEB_PORT || 5000, () => {
    console.log('Server is running')
})
