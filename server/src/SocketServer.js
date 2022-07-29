const { Server } = require('socket.io')

module.exports = class SocketServer
{
    io

    constructor()
    {
        this.io = new Server(process.env.SOCKET_PORT || 6000)

        this.io.on('connection', (socket) =>
        {
            console.log('Socket connected')

            socket.on('message', (msg) =>
            {
                this.io.emit('message', msg)
            })
        })

        this.io.on('disconnect', (socket) =>
        {
            console.log(socket.id + ' disconnected')
        })
    }
}
