let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

//Отдаем заказ-продукты по ID заказа
module.exports.getProductsByOrderId = function getProductsByOrderId(id, callback) {
    let sql = 'SELECT products.id as id, ' +
        'products.name as name, ' +
        'products.vendorCode as vendorCode, ' +
        'orderProduct.quantity as quantity, ' +
        'orderProduct.price as price ' +
        'FROM orderProduct, products ' +
        'WHERE orderProduct.idProduct = products.id AND orderProduct.idOrder = ' + id;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Orders-Products - getProductsByOrderId');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}
