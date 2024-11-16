const express = require('express');
const router = express.Router();

// Đảm bảo rằng đường dẫn tới account_controller.js là chính xác
const { register, login } = require('../controllers/account_controller');

// Đăng ký
router
    .route("/register")
    .post(register)

// Đăng nhập
router
    .route("/login")
    .post(login)

module.exports = router;