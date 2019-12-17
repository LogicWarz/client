import io from 'socket.io-client'

const socket = io.connect('http://coderoyale.server.edirates.xyz')

export default socket
