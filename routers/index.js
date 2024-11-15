// xác định cách phản hồi của server khi có yêu cầu HTTP từ client
const accountRouter = require('./account_router');

module.exports = (app) => {
    // Khi client truy cập vào đường dẫn /account thì sẽ chuyển sang file account_router.js
    app.use('/account', accountRouter);
}
