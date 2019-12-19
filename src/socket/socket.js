import io from 'socket.io-client'

const socket = io.connect('http://coderoyale.server.edirates.xyz', { transports: ["websocket"] })

export default socket
