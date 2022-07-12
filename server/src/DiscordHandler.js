const { Client } = require('discord.js')

module.exports = class DiscordHandler
{
    client
    channelID

    constructor()
    {
        this.client = new Client({
            
            disableEveryone: true,
            intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_TYPING']
        })
        
        this.client.on('ready', () =>
        {
            console.log('Discord client is ready')
        })

        this.client.login(process.env.DISCORD_TOKEN)
    }

    init(guildID)
    {
        let channel = this.client.guilds.cache.get(guildID).channels.create('bridged-chat', { type: 'text' })
        channel.send('This channel is used to communicate with the bridged chat')
        // add channelID to DB

    }
}
