const http = require('http');
const socketIo = require('socket.io');
const app = require('./../server');
const corsOptions = require('./../config/corsOptions');
const { getCurrentPayload } = require('./../monitor/mqttClient.js');
const { clearInterval } = require('timers');

const server = http.createServer();
const io = socketIo(server, { cors: corsOptions });

io.on('connection', (socket) => {
    const interval = setInterval(() => {
        const currentPayload = getCurrentPayload();
        if (currentPayload) {
            socket.emit(currentPayload.topic, currentPayload.message);
        }
    }, 2000)

    socket.on('disconnect', () => {
        clearInterval(interval)
    })
});

const PORT = 2357;

server.listen(PORT, () => console.log('Listening on port', PORT))