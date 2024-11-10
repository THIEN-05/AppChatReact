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
app.use(express.json()); // Middleware để parse JSON

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

// Endpoint cho đăng ký người dùng
app.post('/apiv1/users/signup', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Thiếu thông tin đăng ký' });
    }

    try {
        const newUser = new Account({ userName: username, passWord: password });
        await newUser.save();
        res.status(200).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Đăng ký thất bại!', error: error.message });
    }
});

server.listen(port, () => {
    console.log(`Running server at port ${port}`);
});