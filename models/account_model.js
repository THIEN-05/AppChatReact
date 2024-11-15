// Quy định cấu trúc của account
const mongoose = require('mongoose');
const { type } = require('os');
const { stringify } = require('querystring');
const { setTheUsername } = require('whatwg-url');

// Định nghĩa cấu trúc cấu trúc của document (bản ghi) trong collection (bảng)

const accountSchema = new mongoose.Schema({
    // Bao gồm các trường dữ liệu
    userName:{
        type: String,
        require: true,
        unique: true // Độc quyền
    },
    passWord:{
        type: String,
        require: true
    }
}, {
    versionKey: false
})

// Tạo ra model để qản lý 1 bảng (collection) trong mongoDB
module.exports = mongoose.model('account', accountSchema);
// xuất ra để sử dụng ở các file khác
