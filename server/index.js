const express = require('express');
const http = require("http");
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const Account = require('../models/account_model'); // Import model

const port = 5000;
const connectDB = require('../configs/dataBase');

connectDB(); // Kết nối DB

const app = express();
app.use(cors());



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