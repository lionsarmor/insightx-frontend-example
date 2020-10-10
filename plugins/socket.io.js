import io from 'socket.io-client'

export default ({ app }, inject) => {
    // Set the function directly on the context.app object
    inject('socket', function() {
                var websocketUrl = 'wss://ws.insightx.info/'
                var connectionOptions = {
                    "force new connection": true,
                    "reconnectionAttempts": "Infinity",
                    "timeout": 10000,
                    "transports": ["websocket"]
                };
                let socket = io.connect(websocketUrl, connectionOptions)
                return socket
    })
}
