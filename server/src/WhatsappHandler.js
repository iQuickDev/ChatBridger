const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
module.exports = class WhatsappHandler
{
    client

    constructor()
    {
        this.client = new Client()
        
        this.client.on('qr', (qr) =>
        {
            qrcode.generate(qr, { small: true })
        })

        process.on('SIGINT', () =>
        {
            this.client.destroy()
        })

        
    }
}