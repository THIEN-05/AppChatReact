// Import framework express
const express = require('express');
// Import giao thức http
const http = require("http");
// Import class của thư viện socket.io
const { Server } = require('socket.io');
// Import cors
const cors = require('cors');
const { Socket } = require('dgram');
const { log } = require('console');
var port = 5000;
const connectDB = require('../configs/dataBase');


connectDB(); // Kết nối DB

// Khai báo đối tượng của express
const app = express()
app.use(cors());


// Khai báo server chạy bằng giao thức http dựa trên đối tượng của express
const server = http.createServer(app);





// Tạo đối tượng đại diện cho socket.io (tích hợp thư viện vào server)
const io = new Server(server, {
    cors: {
        // Địa chỉ tới front-end
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});


// Lắng nghe sự kiện kết nối của client, biến socket đại diện cho client
io.on('connection', (socket) => {
    console.log("A user connected");


    socket.on('disconnect', () =>{
        console.log("A user disconnected");
    })

});


// Khởi động server HTTP
server.listen(port, () => {
    console.log(`Running server at port ${port}`)
});
