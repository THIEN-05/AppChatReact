const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Endpoint cho đăng ký người dùng
app.post('/apiv1/users/signup', (req, res) => {
    const { username, password, email } = req.body;

    // Xử lý dữ liệu đăng ký (ví dụ: lưu vào cơ sở dữ liệu)
    // Đây là phần bạn sẽ thay thế bằng logic lưu dữ liệu thực tế

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Thiếu thông tin đăng ký' });
    }

    // Giả sử đăng ký thành công
    res.status(200).json({ message: 'Đăng ký thành công!' });
});

// Khởi chạy server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
