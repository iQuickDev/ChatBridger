const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
module.exports = class WhatsappHandler
{
    client

    constructor()
    {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: { handleSIGINT: false }
        })
        
        this.client.on('qr', (qr) =>
        {
            qrcode.generate(qr, { small: true })
        })

        this.client.on('ready', () =>
        {
            console.log('Whatsapp client is ready')
        })

        process.on('SIGINT', () =>
        {
            this.client.destroy()
            process.exit(0)
        })

        this.client.initialize()
    }
}