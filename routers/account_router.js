// Phản hồi yêu cầu liên quan tới account 

const express = require('express');
const router = express.Router();


const { register, login } = require('../controllers/account_controller');


// Đăng ký
// Khi client truy cập vào đường dẫn /register và gửi request POST (submit dữ liệu) thì hàm register sẽ được gọi
router
    .route("/register")
    .post(register)

// Đăng nhập
// Khi client truy cập vào đường dẫn /login và gửi request POST (submit dữ liệu) thì hàm login sẽ được gọi
router
    .route("/login")
    .post(login)

module.exports = router;

