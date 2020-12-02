module.exports = (server) => {

    const socketioServer = require('socket.io')(server);

    let messages = []

    socketioServer.on('connection', (client) => {

        client.emit('messages', messages)

        client.on('authentification', (firstname) => {
            client.firstname = firstname

            client.broadcast.emit("newAuthentification", client.firstname)
        })

        client.on('newMessage', (message) => {

            messages.push(`${client.firstname} : ${message}`)

            client.broadcast.emit("newMessageReceived", `${client.firstname} : ${message}`)

        })

    });

}

