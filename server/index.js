const port = 5000;
const express = require('express');
const http = require("http");
const { Server } = require('socket.io');
const cors = require('cors');
const router = require('./routers/index');
const connectDB = require('../configs/dataBase');
connectDB(); // Kết nối DB

const app = express();
app.use(cors());

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