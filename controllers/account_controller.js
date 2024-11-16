// Xử lý đăng ký, đăng nhập

const accountModel = require('../models/account_model'); // Import model

// Xuất ra phương thức xử lý đăng ký và đăng nhập để sử dụng ở file routes/account_route.js
module.exports = {

    // tên: phương thức
    register: (req, res) => {

        const password = req.body.password;
        const username = req.body.username;
        const email = req.body.email;

        // Kiểm tra email đã tồn tại chưa
        const account = accountModel.findOne({ email });
        if (account) {
            return res.status(400).json("Email already exists!");
        }

        // Tạo tài khoản mới theo mô hình
        const newAccount = new accountModel({
            username,
            password,
            email
        });

        // Lưu tài khoản mới vào DB
        newAccount.save()
            .then(() => {
                res.status(200).json("Account created!");
            })
            .catch((error) => {
                res.status(400).json("Error: " + error);
            });

    },

    login: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        try {
            // Tìm tài khoản trong DB
            const account = await accountModel.findOne({ email, password });

            if (account) {
                res.status(200).json("Login successful!");
            } else {
                res.status(400).json("Login failed!");
            }
        } catch (error) {
            res.status(500).json("Error: " + error.message);
        }
    }
};