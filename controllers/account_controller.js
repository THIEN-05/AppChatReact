// Xử lý đăng ký, đăng nhập

const accountModel = require('../models/account_model'); // Import model

// Xuất ra phương thức xử lý đăng ký và đăng nhập để sử dụng ở file routes/account_route.js
module.exports = {
    // tên: phương thức


    register: async (req, res) => {

        // Lấy dữ liệu từ client gửi lên, body dạng json
        const body = req.body;
        // Tạo account mới theo cấu trúc đã được định nghĩa trong account_model
        const newAccount = await accountModel.create(body);
        // trả về 
        return res.status(200).json({ message: "Đăng ký thành công" });
    },

    login: async (req, res) => {

        const body = req.body;
        // Tìm được trả về 1 object
        const account = await accountModel.findOne({
            userName: body.userName,
            passWord: body.passWord
        })

        // Nếu không tìm thấy account, kết quả là null
        if (!account) {
            return res.status(404).json({ message: "Tài khoản hoặc mật khẩu không đúng" });
        }

        // Nếu tìm thấy account
        return res.status(200).json({ message: "Đăng nhập thành công" });

    }
};