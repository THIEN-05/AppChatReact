const express = require('express');
const http = require("http");
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('../configs/dataBase');
const router = require('../routers/index');

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json()); // Thêm middleware này để phân tích cú pháp JSON

connectDB(); // Kết nối DB

router(app);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // Địa chỉ của frontend
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log("A user connected");

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });
});

server.listen(port, () => {
    console.log(`Running server at port ${port}`);
});