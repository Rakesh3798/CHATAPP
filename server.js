import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io'
import { fileURLToPath } from 'url';
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "./public")))

app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/index.html")
})

server.listen(9000, () => {
    console.log("Server running on port : " + 9000);
})

io.on('connection', (socket) => {
    console.log("User",socket.id);
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
    socket.on('deleteMessage', (messageId) => {
        socket.broadcast.emit('deleteMessage', messageId)
    });
})
