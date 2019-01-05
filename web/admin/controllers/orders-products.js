const model = require ('../models').ordersProducts;


//Отдаем заказ-продукты по ID заказа
module.exports.getProductsByOrderId = function getProductsByOrderId(req, res) {
    model.getProductsByOrderId(req.params.id, function (result) {
        res.send(result);
    });
}