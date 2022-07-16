const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const Database = require('./src/DatabaseManager').init()
const DiscordHandler = require('./src/DiscordHandler')
const WhatsappHandler = require('./src/WhatsappHandler')
const TelegramHandler = require('./src/TelegramHandler')
const SocketServer = require('./src/SocketServer')

app.use(express.static('public'))
app.use(express.json())

let discord = new DiscordHandler()
let whatsapp = new WhatsappHandler()
let telegram = new TelegramHandler()
let socket = new SocketServer()

app.listen(process.env.WEB_PORT || 5000, () => 
{
    console.log('Server is running')
})
