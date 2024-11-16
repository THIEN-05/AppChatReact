// Quy định cấu trúc của account
const e = require('express');
const mongoose = require('mongoose');
const { type } = require('os');
const { stringify } = require('querystring');
const { setTheUsername } = require('whatwg-url');

// Định nghĩa cấu trúc cấu trúc của document (bản ghi) trong collection (bảng)

const accountSchema = new mongoose.Schema({
    // Bao gồm các trường dữ liệu
    username:{
        type: String,
        require: true, // Bắt buộc
        unique: true // Độc quyền
    },
    email:{
        type: String,
        require: true,
        unique: true
    }, 
    password:{
        type: String,
        require: true
    }
}, {
    versionKey: false
})

// Tạo ra model để qản lý 1 bảng (collection) trong mongoDB
module.exports = mongoose.model('account', accountSchema);
// xuất ra để sử dụng ở các file khác
