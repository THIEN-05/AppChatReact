// Xử lý đăng ký, đăng nhập

const accountModel = require('../models/account_model'); // Import model

// Xuất ra phương thức xử lý đăng ký và đăng nhập để sử dụng ở file routes/account_route.js
module.exports = {

    // tên: phương thức
    register: (req, res) => {

        const { username, password, email } = req.body;

        
        const newAccount = new accountModel({
            username,
            password,
            email
        });

        newAccount.save()
            .then(() => {
                res.json("Account created!");
            })
            .catch((error) => {
                res.status(400).json("Error: " + error);
            });

    },

    login: (req, res) => {

        const { email, password } = req.body;

        const account = accountModel.findOne({
            email: email,
            password: password
        });

        if (account) {
            res.json("Login successful!");
        } else {
            res.json("Login failed!");
        }
    }
};