const { Client } = require('discord.js')
const DatabaseManager = require('./DatabaseManager')
const { io } = require('socket.io-client')

module.exports = class DiscordHandler
{
    client
    channel
    socket

    constructor()
    {
        this.client = new Client({
            
            disableEveryone: true,
            intents: 3276799,
            intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_TYPING'],
            partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD', 'GUILD_MEMBER', 'GUILD_MESSAGE']
        })
    
        this.client.login(process.env.DISCORD_TOKEN)

        this.socket = io(`http://127.0.0.1:${process.env.SOCKET_PORT}`).connect()

        this.channel = {
            serverID: DatabaseManager.db.discordServer,
            channelID: DatabaseManager.db.discordChannel
        }

        this.client.on('messageCreate', (msg) =>
        {
            if (msg.channel.id == this.channel.channelID)
            {
                this.socket.emit('message', {
                    platform: 'discord',
                    message: msg.content,
                    author: `${msg.author.username}#${msg.author.discriminator}`,
                })
            }
        })

        this.client.on('ready', () =>
        {
            console.log('Discord client is ready')

            if (!this.channel.serverID)
            {
                console.log('No discord server set')
                return
            }
            
            if (!this.channel.channelID)
            this.init(this.channel.serverID)
        })
    }

    async init(guildID)
    {
        let channel = await this.client.guilds.cache.get(guildID).channels.create('bridged-chat', { type: 'text' })
        this.channel.channelID = channel.id
        DatabaseManager.set("discordChannel", this.channel.channelID)
        channel.send('Welcome to the bridged chat channel!')
    }

    static async send(message)
    {
        if (!this.channel.channelID)
        {
            console.log('No discord channel set')
            return
        }

        let channel = await this.client.channels.cache.get(this.channel.channelID)
        channel.send(message)
    }
}
