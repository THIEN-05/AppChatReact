const express = require('express');
const http = require("http");
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('../configs/dataBase');
const port = 5000;
const app = express();
app.use(cors());
const accountModel = require('../models/account_model'); // Import model

app.use(express.json()); // Thêm middleware này để phân tích cú pháp JSON

const { displayAccount, login, register } = require('../controllers/account_controller');

connectDB(); // Kết nối DB



// Lắng nghe request đăng ký và đăng nhập
app.post('/users/signup', register);
app.post('/users/signin', login);
// Lắng nghe request lấy thông tin tài khoản
app.get('/users/display', displayAccount);


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