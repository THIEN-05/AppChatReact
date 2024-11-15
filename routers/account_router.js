// Phản hồi yêu cầu liên quan tới account 

const express = require('express');
const router = express.Router();


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

