// Quy định cấu trúc của account
const mongoose = require('mongoose');
const { type } = require('os');
const { stringify } = require('querystring');
const { setTheUsername } = require('whatwg-url');


// Class (bảng thiết kế, không ) 
// Đã tự động sinh ra id
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

// Tạo ra model để sử dụng schema (bảng vẽ)
module.exports = mongoose.model('account', accountSchema);