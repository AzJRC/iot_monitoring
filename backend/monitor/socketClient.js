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

        const testData = {value: Math.round(Math.random() * 10 + 20), timestamp: new Date()}
        socket.emit('pub/test', testData)
    }, 2000)

    socket.on('disconnect', () => {
        clearInterval(interval)
    })
});

const PORT = 2357;

server.listen(PORT, () => console.log('Socket client on', PORT))